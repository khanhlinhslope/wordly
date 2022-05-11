import {
  Box,
  Flex,
  Link,
  useColorModeValue,
  Text
} from '@chakra-ui/react'

const Links = ({ ...props }) => {
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
    <Flex
      flexDir='column'
      justify='space-between'
      align='center'
      w='100%'
      {...props}
    >
      {links.map(link => {
        const { id, title, url, urlCaption } = link

        return (
          <Flex
            key={id}
            flexDir='row'
            justify='space-between'
            align='center'
            // h='full'
            w='100%'
            borderBottom='1px solid #A0AEC0'
            px={4}
            h='75px'
          >
            <Box>
              <Text fontWeight='bold'>
                {title}
              </Text>
            </Box>

            <Flex
              align='center'
              color={useColorModeValue('#818692', '#c3c7e0')}
              fontSize={16}
            >
              <Link
                href={url}
                isExternal
                textDecoration='underline'
              >
                {urlCaption}
              </Link>
            </Flex>
          </Flex>
        )
      })}
    </Flex>
  )
}

export default Links
