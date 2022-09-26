import { ReactElement } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import { GetStaticProps } from "next"
import { Product,  } from 'use-shopping-cart/core'
import Stripe from "stripe"
import Head from "next/head"

import { stripe } from "@lib/stripe"
import 'keen-slider/keen-slider.min.css'

import { CardShirt } from "@components/CardShirt"
import { HomeContainer } from '@styles/pages/home'
import { DefaultLayout } from '@layouts/default'

type ProductData = Product & {
  priceFormatted: string
}

interface HomeProps {
  products: ProductData[]
}

export default function Home({ products }: HomeProps) {

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  });

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => (
          <CardShirt product={product} key={product.id}/>
        ))}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products: ProductData[] = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    return {
      currency: 'BRL',
      id: product.id,
      name: product.name,
      price: price.unit_amount ? price.unit_amount : 0,
      priceFormatted: new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount ? price.unit_amount / 100 : 0),
      sku: '',
      sku_id: product.id,
      image: product.images[0],
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}

