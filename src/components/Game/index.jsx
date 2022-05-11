import { Flex } from '@chakra-ui/react'
import Header from '@components/Header'
import WordleGrid from '@components/Game/WordleGrid'
import Keyboard from '@components/Game/Keyboard'
import { toast } from 'react-toastify'
import { HiCog as CogIcon, HiInformationCircle as HelpIcon } from 'react-icons/hi'

const Game = ({ gameProps, openSettings, keyHandler, ...rest }) => (
  <Flex
    flexDir='column'
    justify='center'
    textAlign='center'
    align='center'
    w={['100%', '90%', '65%', '45%', '40%']}
    {...gameProps}
    {...rest}
  >
    <Header
      rigthIcon={<CogIcon />}
      rightIconHandler={openSettings}
      leftIcon={<HelpIcon />}
      leftIconHandler={() => toast('Test!')}
      headerCaption='Wordly'
      h='calc(var(--vh, 1vh) * 8)'
    />

    <WordleGrid
      minH='calc(var(--vh, 1vh) * 59)'
      py={[2, 5, 5, 5, 5]}
    />

    <Keyboard
      keyHandler={keyHandler}
      minH='calc(var(--vh, 1vh) * 33)'
    />
  </Flex>
)

export default Game
