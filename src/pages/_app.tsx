import '../styles/global.scss';

import type { AppProps } from 'next/app';
import { Montserrat } from 'next/font/google';
import React from 'react';

import Footer from '@/components/footer';

const roboto = Montserrat({ weight: '500', subsets: ['latin'] });

const MyApp = ({ Component, pageProps }: AppProps) => (
  <main className={`${roboto.className}`}>
    <Component {...pageProps} />
    <Footer />
  </main>
);

export default MyApp;
