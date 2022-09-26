import { DefaultLayout } from "@layouts/default"
import { stripe } from "@lib/stripe"
import { GetStaticProps } from "next"
import Image from "next/future/image"
import Head from "next/head"
import { MouseEvent, ReactElement } from "react"
import Stripe from "stripe"
import { useShoppingCart } from "use-shopping-cart"
import { formatCurrencyString, Product as ProductType } from "use-shopping-cart/core"
import { 
  ImageContainer,
  ProductContainer,
  ProductDetails 
} from "../../styles/pages/product"

interface ProductProps {
  product: ProductType
}

export default function Product({ product }: ProductProps) {
  const { addItem, cartDetails } = useShoppingCart()
  const hasProduct = Object.values(cartDetails ?? {}).some(p => p.id === product.id)

  const handleAdd = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if(!hasProduct) {
      addItem(product)
    }
  }

  const priceFormatted = formatCurrencyString({
    currency: 'BRL',
    value: product.price,
    language: 'pt-br',
  })

  return (
    <>
      <Head>
        <title>{`${product.name} | Ignite Shop`}</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          {product.image && (
            <Image
              src={product.image}
              width={520}
              height={480}
              alt={product.name}
              priority 
            />
          )}
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{priceFormatted}</span>

          <p>{product.description}</p>

          <button 
            type="button" 
            onClick={handleAdd} 
            disabled={hasProduct}
          >
            Adicionar ao Carrinho
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export async function getStaticPaths() {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
    limit: 10,
  })

  return {
    paths: response.data.map(product => {
      return { params: { id: product.id } }
    }),
    fallback: 'blocking',
  }
}


export const getStaticProps: GetStaticProps<ProductProps | {}, { id: string }> = async ({ params }) => {
  if(!params) {
    return {
      props: {}
    }
  }

  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        currency: 'BRL',
        id: product.id,
        name: product.name,
        price: price.unit_amount,
        price_id: price.id,
        description: product.description,
        price_data: price,
        sku: product.id,
        sku_id: product.id,
        image: product.images[0],
        product_data: product
      }
    },
    revalidate: 60 * 60 * 1 // 1 hours
  }
}

Product.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}