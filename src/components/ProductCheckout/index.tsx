import Image from 'next/future/image'
import { CartEntry, formatCurrencyString } from 'use-shopping-cart/core'
import * as S from './styles'

interface ProductCheckoutProps {
  product: CartEntry,
  removeItem: (id: string) => void
}

const ProductCheckout = ({ product, removeItem }: ProductCheckoutProps) => {

  const priceFormmated = formatCurrencyString(
    { 
      value: product.price, 
      currency: product.currency 
    })

  const handleRemove = () => {
    removeItem(product.id)
  }
  
  return (
    <S.ProductContainer>
      <S.ImageContainer>
        {product.image && (
          <Image
            src={product.image}
            width={94.79}
            height={94.79}
            alt={product.name}
            priority 
          />
        )}
      </S.ImageContainer>
      <S.TextContainer>
        <p>{product.name}</p>
        <h4>{priceFormmated}</h4>
        <button type="button" title="Remover produto" onClick={handleRemove}>
          Remover
        </button>
      </S.TextContainer>
    </S.ProductContainer>
  )
}

export { ProductCheckout }
