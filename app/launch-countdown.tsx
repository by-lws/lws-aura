'use client';

import { SALES_ARE_LIVE } from './launch';

export function useSalesOpen() {
  return SALES_ARE_LIVE;
}

export function LaunchCountdown({ className = '' }: { className?: string }) {
  return <p className={`launch-open ${className}`.trim()}>ПЕРВЫЙ ТИРАЖ В ПРОДАЖЕ</p>;
}
