'use client';

import { useEffect, useState } from 'react';
import { DELIVERY_START_LABEL, DELIVERY_START_TIMESTAMP, SALES_ARE_LIVE } from './launch';

export function useSalesOpen() {
  return SALES_ARE_LIVE;
}

export function LaunchCountdown({ className = '' }: { className?: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setNow(Date.now());
    update();
    const timer = window.setInterval(update, 1_000);
    return () => window.clearInterval(timer);
  }, []);

  const totalSeconds = now === null ? 0 : Math.max(0, Math.floor((DELIVERY_START_TIMESTAMP - now) / 1_000));
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;

  if (now !== null && totalSeconds === 0) {
    return <p className={`launch-open ${className}`.trim()}>ПАРФЮМ МОЖНО ПОЛУЧИТЬ</p>;
  }

  return (
    <section className={`launch-countdown ${className}`.trim()} aria-label={`До начала получения парфюма ${DELIVERY_START_LABEL}`}>
      <p className="launch-countdown-title">ПОЛУЧЕНИЕ С {DELIVERY_START_LABEL} · ПРЕДЗАКАЗ ОТКРЫТ</p>
      <div className="launch-countdown-numbers" role="timer" aria-live="off">
        <span><b>{String(days).padStart(3, '0')}</b><small>ДНЕЙ</small></span>
        <span><b>{String(hours).padStart(2, '0')}</b><small>ЧАСОВ</small></span>
        <span><b>{String(minutes).padStart(2, '0')}</b><small>МИНУТ</small></span>
        <span><b>{String(seconds).padStart(2, '0')}</b><small>СЕКУНД</small></span>
      </div>
    </section>
  );
}
