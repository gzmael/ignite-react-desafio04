import ButtonCart from '@components/ButtonCart';
import Image from 'next/future/image'
import Link from 'next/link';
import { MouseEvent } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import { Product, formatCurrencyString } from 'use-shopping-cart/core';
import * as S from './styles'

interface CardShirtProps {
  product: Product
}

const CardShirt = ({ product }: CardShirtProps) => {
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
    <Link href={`/product/${product.id}`}  prefetch={false}>
      <S.Card className="keen-slider__slide">
        {product.image && (
          <Image 
            src={product.image} 
            width={520} 
            height={480} 
            alt={product.name} 
            priority 
          />
        )}
        <S.CardFooter>
          <div>
            <strong>{product.name}</strong>
            <span>{priceFormatted}</span>
          </div>
          <ButtonCart
            color='green' 
            title="Adicionar ao Carrinho"
            onClick={e => handleAdd(e)}
          />
        </S.CardFooter>
      </S.Card>
    </Link>
  )
}

export { CardShirt }
