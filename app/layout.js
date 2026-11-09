import { Archivo, JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../components/theme';
import Navbar from '../components/Navbar';
import SmoothScroll from '../components/SmoothScroll';
import BackToTop from '../components/BackToTop';
import AppToaster from '../components/AppToaster';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
});

export const metadata = {
  title: 'Muhammad Bilal - Frontend Engineer',
  description:
    'Muhammad Bilal, frontend engineer in Lahore, Pakistan. Multi-tenant SaaS frontends in React and Next.js.',
  metadataBase: new URL('https://muhammad-bilal-engineer.vercel.app'),
  openGraph: {
    title: 'Muhammad Bilal - Frontend Engineer',
    description:
      'Muhammad Bilal, frontend engineer in Lahore, Pakistan. Multi-tenant SaaS frontends in React and Next.js.',
    url: '/',
    siteName: 'Muhammad Bilal',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Muhammad Bilal - Frontend Engineer',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Bilal - Frontend Engineer',
    description:
      'Muhammad Bilal, frontend engineer in Lahore, Pakistan. Multi-tenant SaaS frontends in React and Next.js.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('theme')!=='light'){document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})()`,
          }}
        />
      </head>
      <body className={`${archivo.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}>
        <ThemeProvider>
          <SmoothScroll />
          <Navbar />
          <main>{children}</main>
          <BackToTop />
          <AppToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
