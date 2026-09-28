import { Inter, Fraunces } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../components/theme';
import Navbar from '../components/Navbar';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-display' });

export const metadata = {
  title: 'Muhammad Bilal — Frontend Engineer & Product Thinker',
  description:
    'Muhammad Bilal is a frontend engineer and product thinker from Lahore, Pakistan, building products end-to-end — from R&D and user flows to business requirements and production.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})()`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${fraunces.variable} antialiased`}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
