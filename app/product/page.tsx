'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BoxSwitch, Header, RunawayBottle, useStore } from '../store';

const sizes = ['30 мл', '50 мл', '100 мл'];

export default function ProductPage() {
  const [size, setSize] = useState('50 мл');
  const [added, setAdded] = useState(false);
  const { add } = useStore();

  const addProduct = () => {
    add(size);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <main className="inner product-page">
      <Header />
      <section className="product-layout" aria-labelledby="product-title">
        <BoxSwitch compact />
        <div className="product-copy">
          <p className="eyebrow">EAU DE PARFUM · РУЧНАЯ РАБОТА</p>
          <h1 id="product-title">LOVE<br />WAR<br />SECRET</h1>
          <p className="product-intro">Чёрный и белый.<br />Боль и сладость.<br />Твой личный контраст.</p>

          <div className="scent-line" aria-label="Раскрытие аромата">
            <span><b>УДАР</b> перец · цитрус</span>
            <span><b>ТЕПЛО</b> ягоды · цветы</span>
            <span><b>СЛЕД</b> ваниль · кожа · смолы</span>
          </div>

          <fieldset className="size-picker">
            <legend>ОБЪЁМ</legend>
            {sizes.map((item) => (
              <button key={item} type="button" className={size === item ? 'active' : ''} onClick={() => setSize(item)}>
                {item}
              </button>
            ))}
          </fieldset>

          <p className="preorder-price">ПРЕДЗАКАЗ · ЦЕНА ПЕРВОГО ВЫПУСКА</p>
          <button className="black-button" type="button" onClick={addProduct}>
            {added ? 'ДОБАВЛЕНО ✓' : 'ДОБАВИТЬ В КОРЗИНУ'}
          </button>
          <Link className="quiet-link" href="/story">ПОЧЕМУ ТАК ПАХНЕТ? →</Link>
        </div>
      </section>
      <RunawayBottle />
    </main>
  );
}
