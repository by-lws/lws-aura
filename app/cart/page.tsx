'use client';

import Link from 'next/link';
import { Header, useStore } from '../store';

export default function CartPage() {
  const { lines, count, setQuantity, remove } = useStore();

  return (
    <main className="inner utility-page">
      <Header />
      <section className="utility-wrap" aria-labelledby="cart-title">
        <div className="utility-heading">
          <p className="eyebrow">ТВОЙ ВЫБОР</p>
          <h1 id="cart-title">КОРЗИНА<br /><span>{String(count).padStart(2, '0')}</span></h1>
        </div>

        <div className="cart-content">
          {lines.length === 0 ? (
            <div className="empty-state">
              <p>Здесь пока тихо.</p>
              <Link className="black-button" href="/product">ВЫБРАТЬ АРОМАТ</Link>
            </div>
          ) : (
            <>
              <div className="cart-lines">
                {lines.map((line) => (
                  <article className="cart-line" key={line.size}>
                    <img src="/assets/box-filled.png" alt="" />
                    <div><b>LOVEWARSECRET</b><span>EAU DE PARFUM / {line.size}</span></div>
                    <div className="quantity" aria-label={`Количество, ${line.size}`}>
                      <button onClick={() => setQuantity(line.size, line.quantity - 1)} aria-label="Уменьшить">−</button>
                      <span>{line.quantity}</span>
                      <button onClick={() => setQuantity(line.size, line.quantity + 1)} aria-label="Увеличить">+</button>
                    </div>
                    <button className="remove" onClick={() => remove(line.size)}>УБРАТЬ</button>
                  </article>
                ))}
              </div>
              <div className="cart-next">
                <p>ПРЕДЗАКАЗ<br /><span>Оплата будет подключена позже</span></p>
                <Link className="black-button" href="/checkout">ОФОРМИТЬ ЗАКАЗ</Link>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
