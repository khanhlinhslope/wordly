import { Flex, Link, useColorModeValue, Text, VStack } from '@chakra-ui/react'

const Links = ({ ...props }) => {
  const linkColor = useColorModeValue('#818692', '#c3c7e0')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const links = [
    {
      id: 'about',
      title: 'About',
      urlCaption: 'Twitter',
      url: 'https://twitter.com/marsigliaCR'
    },
    {
      id: 'source-code',
      title: 'Source code',
      urlCaption: 'GitHub',
      url: 'https://github.com/marsidev/wordly'
    }
  ]

  return (
    <VStack {...props}>
      {links.map(link => {
        const { id, title, url, urlCaption } = link

        return (
          <Flex
            key={id}
            borderBottom='1px solid'
            borderColor={borderColor}
            px={4}
            minH='75px'
            minW={['300px', '500px']}
            justify='space-between'
            align='center'
          >
            <Text fontWeight={600}>{title}</Text>

            <Flex as='span' align='center' color={linkColor} fontSize={16}>
              <Link href={url} isExternal textDecoration='underline'>
                {urlCaption}
              </Link>
            </Flex>
          </Flex>
        )
      })}
    </VStack>
  )
}

export default Links
