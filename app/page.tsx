import Link from 'next/link';
import { LaunchCountdown } from './launch-countdown';
import { BoxSwitch, Header, RunawayBottle } from './store';

const tickerText = 'БОЛЬ · НАДЕЖДА · СЛАДОСТЬ · ПЕРЕЦ · ДЫМ · ВАНИЛЬ · '.repeat(8);

export default function Home() {
  return (
    <main className="home">
      <Header />
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="issue">ПЕРВЫЙ ВЫПУСК / 001</p>
          <h1 id="hero-title">LOVE<br />WAR<br />SECRET</h1>
          <p className="hero-line">Сначала обжигает.<br />Потом остаётся с тобой.</p>
          <LaunchCountdown className="hero-countdown" />
          <Link className="primary-link" href="/product">
            ОФОРМИТЬ ПРЕДЗАКАЗ <span aria-hidden="true">↘</span>
          </Link>
        </div>
        <BoxSwitch />
      </section>
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track"><span>{tickerText}</span><span>{tickerText}</span></div>
      </div>
      <RunawayBottle />
    </main>
  );
}
