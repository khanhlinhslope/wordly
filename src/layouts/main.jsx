import { DefaultSeo } from 'next-seo'
import { defaultSeo } from 'next-seo.config'

export default function GameLayout({ children }) {
  return (
    <>
      <DefaultSeo {...defaultSeo} />
      {children}
    </>
  )
}
