import { styled } from "@styles";

export const Container = styled('aside', {
  width: '480px',
  backgroundColor: '$gray800',
  height: '100vh',
  position: 'absolute',
  top: '0',
  right: '0',
  zIndex: 100,
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',
  padding: '1.5rem 3rem 3rem',
  transform: 'translateX(480px)',
  transition: 'transform 0.3s ease-in-out',

  variants: {
    show: {
      true: {
        transform: 'translateX(0%)',
      }
    }
  }
})

export const Content = styled('div', {
  width: '100%',
  height: '100%',
  paddingTop: '48px',
  display: 'grid',
  gap: '2rem',
  gridTemplateRows: '2rem auto 4rem 69px',
  gridTemplateColumns: '1fr',
  justifyContent: 'space-between',
})

export const ButtonClose = styled('button', {
  width: '1.5rem',
  height: '1.5rem',
  background: 'none',
  border: 'none',
  color: '$gray400',
  position: 'absolute',
  right: '1.5rem',
  cursor: 'pointer',
})

export const ProductList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
})

export const Details = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  div: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})

export const DetailPrice = styled('span', {
  fontSize: '18px',
  fontWeight: 'bold',
  '& + span': {
    fontSize: '24px',
    lineHeight: '140%',
  }
})