import '../styles/global.scss';

import type { AppProps } from 'next/app';
import { Nunito } from 'next/font/google';
import React from 'react';

import Footer from '@/components/footer';

const nunito = Nunito({ subsets: ['latin'] });

const MyApp = ({ Component, pageProps }: AppProps) => (
  <main className={`${nunito.className}`}>
    <Component {...pageProps} />
    <Footer />
  </main>
);

export default MyApp;
