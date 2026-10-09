import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.auralws.ru'),
  applicationName: 'Aura by LWS',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/brand/icon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/brand/icon-16.png', type: 'image/png', sizes: '16x16' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  title: {
    default: 'LWS Aura — LoveWarSecret',
    template: '%s — LWS Aura',
  },
  description: 'Чёрный и белый. Боль и сладость. Первый аромат LWS Aura.',
  openGraph: {
    title: 'LOVE / WAR / SECRET',
    description: 'LWS Aura · первый выпуск',
    images: [
      { url: '/brand/preview.png', width: 1200, height: 630, alt: 'Aura by LWS — белый фирменный знак LWS на чёрном фоне' },
      { url: '/og.png', width: 1730, height: 909, alt: 'LOVE / WAR / SECRET — LWS Aura' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LOVE / WAR / SECRET',
    description: 'LWS Aura · первый выпуск',
    images: ['/brand/preview.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
