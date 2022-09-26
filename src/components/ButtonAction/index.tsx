import { ButtonHTMLAttributes } from 'react'
import * as S from './styles'

type ButtonAction = ButtonHTMLAttributes<HTMLButtonElement>

const ButtonAction = ({ type = "button", children, ...rest }: ButtonAction) => {
  return (
    <S.Button type={type} {...rest}>
      {children}
    </S.Button>
  )
}

export { ButtonAction }
