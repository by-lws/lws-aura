'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { ProductSize } from './launch';

export type CartLine = { size: ProductSize; quantity: number };

export function useStore() {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    const readCart = () => {
      try {
        const saved = window.localStorage.getItem('lws-aura-cart');
        setLines(saved ? JSON.parse(saved) as CartLine[] : []);
      } catch {
        window.localStorage.removeItem('lws-aura-cart');
        setLines([]);
      }
    };
    const syncCart = (event: Event) => {
      const detail = (event as CustomEvent<CartLine[]>).detail;
      if (detail) setLines(detail);
      else readCart();
    };
    readCart();
    window.addEventListener('lws-cart', syncCart);
    window.addEventListener('storage', syncCart);
    return () => {
      window.removeEventListener('lws-cart', syncCart);
      window.removeEventListener('storage', syncCart);
    };
  }, []);

  const commit = (change: (current: CartLine[]) => CartLine[]) => {
    let current = lines;
    try {
      const saved = window.localStorage.getItem('lws-aura-cart');
      if (saved) current = JSON.parse(saved) as CartLine[];
    } catch {
      window.localStorage.removeItem('lws-aura-cart');
    }
    const next = change(current);
    window.localStorage.setItem('lws-aura-cart', JSON.stringify(next));
    setLines(next);
    window.dispatchEvent(new CustomEvent('lws-cart', { detail: next }));
  };

  const add = (size: ProductSize) => {
    commit((current) => {
      const existing = current.find((line) => line.size === size);
      return existing
        ? current.map((line) => line.size === size ? { ...line, quantity: line.quantity + 1 } : line)
        : [...current, { size, quantity: 1 }];
    });
  };

  const setQuantity = (size: ProductSize, quantity: number) => {
    commit((current) => quantity < 1
      ? current.filter((line) => line.size !== size)
      : current.map((line) => line.size === size ? { ...line, quantity } : line));
  };

  const remove = (size: ProductSize) => commit((current) => current.filter((line) => line.size !== size));
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);

  return { lines, count, add, setQuantity, remove };
}

export function Header({ light = false }: { light?: boolean }) {
  const { count } = useStore();
  const pathname = usePathname();
  const current = (href: string) => (
    pathname === href || (href === '/cart' && pathname === '/checkout')
  ) ? 'page' : undefined;

  return (
    <header className={`masthead ${light ? 'masthead-light' : ''}`}>
      <Link className="wordmark" href="/" aria-label="LWS Aura — на главную">
        LWS <span>AURA</span>
      </Link>
      <nav className="desktop-nav" aria-label="Основная навигация">
        <Link href="/product" aria-current={current('/product')}>АРОМАТ</Link>
        <Link href="/story" aria-current={current('/story')}>ИСТОРИЯ</Link>
        <Link href="/cart" aria-current={current('/cart')}>КОРЗИНА · {count}</Link>
      </nav>
      <nav className="mobile-nav" aria-label="Мобильная навигация">
        <Link href="/" aria-current={current('/')}><small>01</small>ГЛАВНАЯ</Link>
        <Link href="/product" aria-current={current('/product')}><small>02</small>АРОМАТ</Link>
        <Link href="/story" aria-current={current('/story')}><small>03</small>ИСТОРИЯ</Link>
        <Link href="/cart" aria-current={current('/cart')}><small>{String(count).padStart(2, '0')}</small>КОРЗИНА</Link>
      </nav>
    </header>
  );
}

export function BoxSwitch({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`product-stage ${compact ? 'product-stage-compact' : ''}`}>
      <button className="box-switch" type="button" aria-label="Сменить вид упаковки">
        <img className="box-image box-filled" src="/assets/box-filled.png" alt="LoveWarSecret — флакон в коробке с малиной и перцем" />
        <img className="box-image box-empty" src="/assets/box-empty.png" alt="" />
      </button>
      <span className="hover-note">НАВЕДИ / КОСНИСЬ</span>
    </div>
  );
}

export function RunawayBottle() {
  const runner = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const node = runner.current;
    if (!node) return;
    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
    const place = (x: number, y: number) => {
      position.current = {
        x: clamp(x, 12, window.innerWidth - node.offsetWidth - 12),
        y: clamp(y, 82, window.innerHeight - node.offsetHeight - 18),
      };
      node.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
    };
    place(window.innerWidth * 0.78, window.innerHeight * 0.62);

    const escape = (clientX: number, clientY: number, force = false) => {
      const rect = node.getBoundingClientRect();
      const dx = rect.left + rect.width / 2 - clientX;
      const dy = rect.top + rect.height / 2 - clientY;
      const distance = Math.hypot(dx, dy);
      if (!force && distance > 190) return;
      const angle = force ? Math.random() * Math.PI * 2 : Math.atan2(dy || 1, dx || 1) + (Math.random() - .5) * .45;
      const jump = force ? 115 : Math.max(72, 178 - distance * .35);
      place(position.current.x + Math.cos(angle) * jump, position.current.y + Math.sin(angle) * jump);
    };

    const onPointerMove = (event: PointerEvent) => event.pointerType === 'mouse' && escape(event.clientX, event.clientY);
    const onTouch = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) escape(touch.clientX, touch.clientY, true);
    };
    const onResize = () => place(position.current.x, position.current.y);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('touchstart', onTouch, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div ref={runner} className="runner" aria-hidden="true">
      <img className="runner-bob" src="/assets/bottle-cutout.png" alt="" />
    </div>
  );
}
