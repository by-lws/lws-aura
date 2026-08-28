import type { Metadata } from 'next';
import Link from 'next/link';
import { Header, RunawayBottle } from '../store';

export const metadata: Metadata = {
  title: 'История',
  description: 'LoveWarSecret — боль и надежда, рассказанные ароматом.',
  openGraph: { title: 'LoveWarSecret — история', description: 'Боль и надежда, рассказанные ароматом.', images: [] },
  twitter: { title: 'LoveWarSecret — история', description: 'Боль и надежда, рассказанные ароматом.', images: [] },
};

export default function StoryPage() {
  return (
    <main className="inner story-page">
      <Header light />
      <section className="story-hero">
        <p className="eyebrow">LWS / НАПРАВЛЕНИЕ 01</p>
        <h1>БОЛЬ<br />И НАДЕЖДА</h1>
        <p>Аромат о моменте,<br />когда правда остаётся с тобой.</p>
        <img src="/assets/cross.png" alt="" />
      </section>

      <section className="three-beats" aria-label="Три аккорда LoveWarSecret">
        <article><span>01 / LOVE</span><h2>СЛАДОСТЬ</h2><p>Ягоды и цветы появляются после первого удара.</p></article>
        <article><span>02 / WAR</span><h2>ОЖОГ</h2><p>Перец и цитрус. Резко, как правда.</p></article>
        <article><span>03 / SECRET</span><h2>СЛЕД</h2><p>Тёмная ваниль, кожа и смолы остаются на коже.</p></article>
      </section>

      <blockquote>«Каждый аромат — твоя новая глава»</blockquote>
      <Link className="white-button" href="/product">ВЫБРАТЬ ОБЪЁМ</Link>
      <RunawayBottle />
    </main>
  );
}
