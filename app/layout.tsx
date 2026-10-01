import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://lws-aura-alpha.vercel.app'),
  title: {
    default: 'LWS Aura — LoveWarSecret',
    template: '%s — LWS Aura',
  },
  description: 'Чёрный и белый. Боль и сладость. Первый аромат LWS Aura.',
  openGraph: {
    title: 'LOVE / WAR / SECRET',
    description: 'LWS Aura · первый выпуск',
    images: [{ url: '/og.png', width: 1730, height: 909, alt: 'LOVE / WAR / SECRET — LWS Aura' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LOVE / WAR / SECRET',
    description: 'LWS Aura · первый выпуск',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
