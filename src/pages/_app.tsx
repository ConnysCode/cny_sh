import '../styles/global.scss';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import type { AppProps } from 'next/app';
import { Montserrat } from 'next/font/google';
import React from 'react';

import Footer from '@/components/footer';

config.autoAddCss = false;

const roboto = Montserrat({ weight: '500', subsets: ['latin'] });

const MyApp = ({ Component, pageProps }: AppProps) => (
  <main className={`${roboto.className}`}>
    <Component {...pageProps} />
    <Footer />
  </main>
);

export default MyApp;
