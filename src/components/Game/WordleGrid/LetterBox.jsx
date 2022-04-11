import { Flex, chakra, useColorModeValue, useToken } from '@chakra-ui/react'

const LetterBox = ({ letterData, isSubmitted }) => {
  const { letter, status } = letterData
  const isEmpty = status === 'empty'

  const COLORS = {
    default: useColorModeValue('gray.100', 'gray.200'),
    guessed: useColorModeValue('green.300', 'green.400'),
    exists: useColorModeValue('orange.300', 'orange.400'),
    failed: useColorModeValue('gray.400', 'gray.500')
  }

  const [alpha0, alpha1, alpha2, alpha3] = useToken(
    'colors',
    ['blackAlpha.300', 'blackAlpha.400', 'blackAlpha.500', 'blackAlpha.600']
  )

  const boxSize = [14, 14, 16, 16, 16]

  const border = isSubmitted
    ? 'none'
    : `2px solid ${isEmpty
      ? useColorModeValue(alpha0, alpha1)
      : useColorModeValue(alpha2, alpha3)
    }`

  let bg
  if (!isSubmitted) bg = COLORS.default
  else {
    if (status === 'guessed') bg = COLORS.guessed
    else if (status === 'exists') bg = COLORS.exists
    else if (status === 'not_exists') bg = COLORS.failed
  }

  const fontColor = isSubmitted
    ? 'white'
    : 'black'

  return (
    <Flex
      h={boxSize}
      w={boxSize}
      borderRadius={4}
      textTransform='uppercase'
      justify='center'
      align='center'
      border={border}
      bg={bg}
      color={fontColor}
      transition='all .2s ease-in-out'
      fontWeight='bold'
      fontSize={36}
    >
      <chakra.span>
        {letter}
      </chakra.span>
    </Flex>
  )
}

export default LetterBox
