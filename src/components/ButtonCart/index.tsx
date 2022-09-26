import { ButtonHTMLAttributes, memo } from 'react'
import { Handbag } from 'phosphor-react'

import * as S from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'gray' | 'green'
  badge?: number
}

const ButtonCart = ({ color = 'gray', badge, ...rest }: ButtonProps) => {
  return (
    <S.ButtonCheckout type="button" color={color} {...rest}>
      <Handbag size={24} weight="bold" />
      {badge && (
        <S.BadgeCart>{badge}</S.BadgeCart>
      )}
    </S.ButtonCheckout>
  )
}

export default memo(ButtonCart)
