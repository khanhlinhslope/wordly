import { Flex, Stack } from '@chakra-ui/react'
import Modal from '@components/Modal'
import { getTodayWordIndex } from '@lib/wotd'
import useStore from '@lib/store'
import { GAME_CONFIG } from '@lib/constants'

import Stats from './Stats'
import Distribution from './Distribution'
import CountDown from './CountDown'
import GuessesDraw from './GuessesDraw'
import ShareGame from './ShareGame'
import WinLossMessage from './WinLossMessage'

const GameOverModal = ({ isOpen, onClose, ...rest }) => {
  const { wordList, inputIndex, gameState } = useStore()
  const { tries: maxTries } = GAME_CONFIG

  const todayWordIndex = getTodayWordIndex()

  const tries = gameState === 'LOSS'
    ? `X/${maxTries}`
    : `${inputIndex}/${maxTries}`

  const title = `Wordly #${todayWordIndex + 1} - ${tries}`

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      motionPreset='slideInBottom'
      scrollBehavior='inside'
      showCloseIcon={true}
      size='xl'
      title={title}
      onClose={onClose}
      {...rest}
    >
      <Flex justify='center' w='100%'>
        <Flex flexDir='column' maxW='600px' w='100%'>
          <GuessesDraw />

          <WinLossMessage mt={2} />

          <Stats mt={8} />

          <Distribution mt={8} />

          <Stack
            align='center'
            direction={['column', 'row']}
            justify='space-between'
            mb={8}
            mt={8}
            px={4}
            spacing={2}
          >
            <CountDown />

            <ShareGame title={title} wordList={wordList} />
          </Stack>
        </Flex>
      </Flex>
    </Modal>
  )
}

export default GameOverModal
