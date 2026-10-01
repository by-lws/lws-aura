'use client';

import { useEffect, useState } from 'react';
import { SALES_LAUNCH_LABEL, SALES_LAUNCH_TIMESTAMP, areSalesOpen } from './launch';

type Countdown = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

const zeroCountdown: Countdown = { days: '000', hours: '00', minutes: '00', seconds: '00' };

function getCountdown(now: number): Countdown {
  const totalSeconds = Math.max(0, Math.floor((SALES_LAUNCH_TIMESTAMP - now) / 1000));
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days: String(days).padStart(3, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  };
}

export function useSalesOpen() {
  const [salesOpen, setSalesOpen] = useState(false);

  useEffect(() => {
    const update = () => setSalesOpen(areSalesOpen());
    update();
    const timer = window.setInterval(update, 1_000);
    return () => window.clearInterval(timer);
  }, []);

  return salesOpen;
}

export function LaunchCountdown({ className = '' }: { className?: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setNow(Date.now());
    update();
    const timer = window.setInterval(update, 1_000);
    return () => window.clearInterval(timer);
  }, []);

  const salesOpen = now !== null && areSalesOpen(now);
  const countdown = now === null ? zeroCountdown : getCountdown(now);

  if (salesOpen) {
    return <p className={`launch-open ${className}`.trim()}>ПРОДАЖИ ОТКРЫТЫ</p>;
  }

  return (
    <section className={`launch-countdown ${className}`.trim()} aria-label={`До старта продаж ${SALES_LAUNCH_LABEL}`}>
      <p className="launch-countdown-title">СТАРТ ПРОДАЖ · {SALES_LAUNCH_LABEL}</p>
      <div className="launch-countdown-numbers" role="timer" aria-live="off">
        <span><b>{countdown.days}</b><small>ДНЕЙ</small></span>
        <span><b>{countdown.hours}</b><small>ЧАСОВ</small></span>
        <span><b>{countdown.minutes}</b><small>МИНУТ</small></span>
        <span><b>{countdown.seconds}</b><small>СЕКУНД</small></span>
      </div>
    </section>
  );
}
