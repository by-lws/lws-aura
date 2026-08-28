'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { Header, useStore } from '../store';

export default function CheckoutPage() {
  const { lines, count } = useStore();
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="inner utility-page checkout-page">
      <Header />
      {sent ? (
        <section className="success-state">
          <p className="eyebrow">ЗАКАЗ СФОРМИРОВАН</p>
          <h1>МЫ<br />ГОТОВЫ.</h1>
          <p>Форма работает как прототип. После подключения оплаты заявка будет отправляться автоматически.</p>
          <Link className="black-button" href="/">НА ГЛАВНУЮ</Link>
        </section>
      ) : (
        <section className="checkout-layout" aria-labelledby="checkout-title">
          <div className="utility-heading">
            <p className="eyebrow">ПОСЛЕДНИЙ ШАГ</p>
            <h1 id="checkout-title">ОФОРМЛЕНИЕ</h1>
            <p className="checkout-note">Списания не будет — платёжный этап подключим следующим.</p>
          </div>
          <form className="checkout-form" onSubmit={submit}>
            <label><span>ИМЯ И ФАМИЛИЯ *</span><input name="name" autoComplete="name" required /></label>
            <div className="field-row">
              <label><span>ТЕЛЕФОН *</span><input name="phone" type="tel" autoComplete="tel" required /></label>
              <label><span>EMAIL *</span><input name="email" type="email" autoComplete="email" required /></label>
            </div>
            <div className="field-row">
              <label><span>ГОРОД *</span><input name="city" autoComplete="address-level2" required /></label>
              <label><span>ИНДЕКС</span><input name="postal" inputMode="numeric" autoComplete="postal-code" /></label>
            </div>
            <label><span>АДРЕС ДОСТАВКИ *</span><input name="address" autoComplete="street-address" required /></label>
            <label><span>КОММЕНТАРИЙ</span><textarea name="comment" rows={3} /></label>

            <div className="order-summary">
              <span>LOVEWARSECRET</span>
              <span>{lines.length ? lines.map((line) => `${line.size} × ${line.quantity}`).join(' / ') : 'КОРЗИНА ПУСТА'}</span>
            </div>
            <label className="consent"><input type="checkbox" required /><span>Я согласен на обработку данных для оформления заказа</span></label>
            <button className="black-button" type="submit" disabled={count === 0}>СФОРМИРОВАТЬ ЗАЯВКУ</button>
            {count === 0 && <Link className="quiet-link" href="/product">СНАЧАЛА ВЫБРАТЬ АРОМАТ →</Link>}
          </form>
        </section>
      )}
    </main>
  );
}
