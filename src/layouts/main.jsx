import { Flex } from '@chakra-ui/react'
import { DefaultSeo } from 'next-seo'
import { defaultSeo } from 'next-seo.config'

const GameLayout = ({ children }) => {
  return (
    <>
      <DefaultSeo {...defaultSeo} />
      <Flex
        align='center'
        flexDir='column'
        fontFamily='Open Sans, Roboto, sans-serif, Arial, Helvetica, monospace'
        justify='flex-start'
        minH='calc(var(--vh, 1vh) * 100)'
        overflow='hidden'
        textAlign='center'
      >
        {children}
      </Flex>
    </>
  )
}

export default GameLayout
