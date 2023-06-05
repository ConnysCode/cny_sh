import '../styles/global.scss';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import type { AppProps } from 'next/app';
import { Montserrat } from 'next/font/google';
import React from 'react';

config.autoAddCss = false;

const roboto = Montserrat({ weight: ['400', '500'], subsets: ['latin'] });

const MyApp = ({ Component, pageProps }: AppProps) => (
  <main className={`${roboto.className}`}>
    {/* <Header /> */}
    <Component {...pageProps} />
    {/* <Footer /> */}
  </main>
);

export default MyApp;
