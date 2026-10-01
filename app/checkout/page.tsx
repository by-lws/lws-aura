'use client';

import Link from 'next/link';
import { FormEvent } from 'react';
import { LaunchCountdown, useSalesOpen } from '../launch-countdown';
import { Header, useStore } from '../store';

export default function CheckoutPage() {
  const { lines, count } = useStore();
  const salesOpen = useSalesOpen();
  const preventSubmit = (event: FormEvent<HTMLFormElement>) => event.preventDefault();

  return (
    <main className="inner utility-page checkout-page">
      <Header />
      <section className="checkout-layout" aria-labelledby="checkout-title">
        <div className="utility-heading">
          <p className="eyebrow">ПОСЛЕДНИЙ ШАГ</p>
          <h1 id="checkout-title">ОФОРМЛЕНИЕ</h1>
          <p className="checkout-note">
            {salesOpen ? 'Оформление заказа открыто.' : 'Продажи ещё не открыты. Сохрани аромат в корзине — оплата станет доступна в день запуска.'}
          </p>
          <LaunchCountdown className="checkout-countdown" />
        </div>
        <form className="checkout-form" onSubmit={preventSubmit}>
          <fieldset disabled={!salesOpen}>
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
            <button className="black-button" type="submit" disabled={!salesOpen || count === 0}>
              {salesOpen ? 'ПЕРЕЙТИ К ОПЛАТЕ' : 'ОПЛАТА ОТКРОЕТСЯ 20.02.2027'}
            </button>
          </fieldset>
          {!salesOpen && <p className="form-launch-note">Поля откроются одновременно с продажами. Корзина сохранится на этом устройстве.</p>}
          {count === 0 && <Link className="quiet-link" href="/product">СНАЧАЛА ВЫБРАТЬ АРОМАТ →</Link>}
        </form>
      </section>
    </main>
  );
}
