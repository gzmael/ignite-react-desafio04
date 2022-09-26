import { styled } from "@styles";

export const ProductContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '20px',
})

export const ImageContainer = styled('div', {
  width: 102,
  height: 94,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  }
})

export const TextContainer = styled('div', {
  width: '100%',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: 2,

  p: {
    fontSize: 18,
    lineHeight: '160%',
    color: '$gray300'
  },
  h4: {
    fontSize: 18,
    lineHeight: '160%',
    fontWeight: 'bold',
    color: '$white',
  },
  button: {
    fontSize: 16,
    lineHeight: '160%',
    fontWeight: 'bold',
    border: 'none',
    background: 'none',
    color: '$green300',
    cursor: 'pointer',

    '&:hover': {
      color: '$gray500',
    }
  }
})