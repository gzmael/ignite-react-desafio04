import { styled } from "@styles";

export const ButtonCheckout = styled('button', {
  padding: '0.75rem',
  borderRadius: '6px',
  border: 'none',
  position: 'relative',
  cursor: 'pointer',
  variants: {
    color: {
      gray: {
        backgroundColor: '$gray800',
        color: '$gray400',
        '&:hover': {
          color: '$gray300',
        },
      },
      green: {
        backgroundColor: '$green500',
        color: '$gray100',
        '&:hover': {
          color: '$white',
          backgroundColor: '$green300',
        },
      }
    }
  }
})

export const BadgeCart = styled('span', {
  position: 'absolute',
  border: '3px solid $gray900',
  backgroundColor: '$green300',
  color: '$white',
  height: '30px',
  width: '30px',
  borderRadius: 999,
  top: '-0.75rem',
  right: '-0.75rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: '700',
})