import Link from 'next/link';
import { BoxSwitch, Header, RunawayBottle } from './store';

export default function Home() {
  return (
    <main className="home">
      <Header />
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="issue">ПЕРВЫЙ ВЫПУСК / 001</p>
          <h1 id="hero-title">LOVE<br />WAR<br />SECRET</h1>
          <p className="hero-line">Сначала обжигает.<br />Потом остаётся с тобой.</p>
          <Link className="primary-link" href="/product">
            ВОЙТИ В ПРЕДЗАКАЗ <span aria-hidden="true">↘</span>
          </Link>
        </div>
        <BoxSwitch />
      </section>
      <div className="ticker" aria-hidden="true">
        <span>БОЛЬ · НАДЕЖДА · СЛАДОСТЬ · ПЕРЕЦ · ДЫМ · ВАНИЛЬ · </span>
        <span>БОЛЬ · НАДЕЖДА · СЛАДОСТЬ · ПЕРЕЦ · ДЫМ · ВАНИЛЬ · </span>
      </div>
      <RunawayBottle />
    </main>
  );
}
