import { Archivo, JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../components/theme';
import Navbar from '../components/Navbar';

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
  title: 'Muhammad Bilal — Frontend Engineer',
  description:
    'Muhammad Bilal is a frontend engineer from Lahore, Pakistan, with a product-engineering mindset — building products end-to-end, from R&D and user flows to business requirements and production.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${archivo.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
