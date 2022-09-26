import { Header } from '@components/Header'
import { Sidebar } from '@components/Sidebar'
import Head from 'next/head'
import { ReactNode } from 'react'
import * as S from './styles'

interface DefaultLayoutProps {
  children: ReactNode
  title?: string
}

const DefaultLayout = ({ children, title = 'Ignite Shop' }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <S.Container>
        <Header />
        {children}
      </S.Container>
      <Sidebar />
    </>
  )
}

export { DefaultLayout }
