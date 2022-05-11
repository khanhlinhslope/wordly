import { Flex } from '@chakra-ui/react'
import { DefaultSeo } from 'next-seo'
import { defaultSeo } from 'next-seo.config'

const GameLayout = ({ children }) => {
  return (
    <>
      <DefaultSeo {...defaultSeo} />
      <Flex
        flexDir='column'
        justify='flex-start'
        textAlign='center'
        align='center'
        fontFamily='Open Sans, Roboto, sans-serif, Arial, Helvetica, monospace'
        overflow='hidden'
        minH='calc(var(--vh, 1vh) * 100)'
      >
        {children}
      </Flex>
    </>
  )
}

export default GameLayout
