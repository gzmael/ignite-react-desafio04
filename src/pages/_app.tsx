/* eslint-disable @next/next/no-img-element */
import { Header } from '@components/Header'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { CartProvider } from 'use-shopping-cart'

import { globalStyles } from '../styles/global'

globalStyles()

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  if(Component.getLayout) {
    return (
      <CartProvider
        cartMode="checkout-session"
        stripe={process.env.NEXT_STRIPE_SECRET_KEY || ''}
        currency="BRL"
      >
        {Component.getLayout(<Component {...pageProps} />)}
      </CartProvider>
    )
  }

  return (
    <CartProvider
      cartMode="checkout-session"
      stripe={process.env.NEXT_STRIPE_SECRET_KEY || ''}
      currency="BRL"
    >
      <Component {...pageProps} />
    </CartProvider>
  )
}
