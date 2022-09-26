import { ButtonAction } from '@components/ButtonAction'
import { ProductCheckout } from '@components/ProductCheckout'
import { api } from '@lib/axios'
import { useRouter } from 'next/router'
import { X } from 'phosphor-react'
import { useCallback, useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import * as S from './styles'

const Sidebar = () => {
  const router = useRouter()
  const { 
    shouldDisplayCart, 
    handleCartClick, 
    cartDetails, 
    formattedTotalPrice,
    removeItem,
    clearCart,
  } = useShoppingCart()

  const handleCheckout = async () => {
    try {
      const result = await api.post('/checkout', {
        cart: cartDetails
      })
      clearCart();
      router.push(result.data.checkoutUrl)
    } catch (err) {
      console.log(err)
    } finally {
    }
  }
  
  const cartEntries = Object.values(cartDetails ?? {}).map((entry) => (
    <ProductCheckout key={entry.id} product={entry} removeItem={removeItem} />
  ))

  const handleToggle = useCallback(() => {
    console.log('Toggle toggle')
    handleCartClick()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <S.Container show={shouldDisplayCart}>
      <S.ButtonClose type="button" onClick={handleToggle} title="Fechar Sidebar">
        <X size={24} weight="bold" />
      </S.ButtonClose>
      <S.Content>
        <h2>Sacola de Compras</h2>
        <S.ProductList>
          {cartEntries.length === 0 ? <p>Carrinho vazio.</p> : null}
          {cartEntries.length > 0 ? (
          <>
            {cartEntries}
          </>
        ) : null}
        </S.ProductList>
        <S.Details>
          <div>
            <span>Quantidade</span>
            <span>{cartEntries.length} items</span>
          </div>
          <div>
            <S.DetailPrice>Valor Total</S.DetailPrice>
            <S.DetailPrice>{formattedTotalPrice}</S.DetailPrice>
          </div>
        </S.Details>
        <ButtonAction
          onClick={handleCheckout}
        >
          Finalizar compra
        </ButtonAction>
      </S.Content>
    </S.Container>
  )
}

export { Sidebar }
