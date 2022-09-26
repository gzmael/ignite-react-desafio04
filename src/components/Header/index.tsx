/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/future/image'
import Link from 'next/link'
import { useCallback } from 'react'
import { useShoppingCart } from 'use-shopping-cart'

import ButtonCart from '@components/ButtonCart'

import logoImg from "../../assets/logo.svg"
import { HeaderContainer } from './styles'

const Header = () => {
  const { cartCount, handleCartClick } = useShoppingCart()

  const handleToggle = useCallback(() => {
    handleCartClick()
  }, [])

  return (
    <HeaderContainer>
      <Link href="/">
        <a>
          <Image src={logoImg} alt="Teste" />
        </a>
      </Link>
      <ButtonCart 
        color='gray' 
        badge={cartCount ? cartCount : undefined} 
        onClick={handleToggle} 
        disabled={cartCount && cartCount > 0 ? false : true}
      />
    </HeaderContainer>
  )
}

export { Header }
