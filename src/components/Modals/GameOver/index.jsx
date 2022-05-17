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
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      motionPreset='slideInBottom'
      size='xl'
      title={title}
      showCloseIcon={true}
      scrollBehavior='inside'
      {...rest}
    >
      <Flex justify='center' w='100%'>
        <Flex flexDir='column' w='100%' maxW='600px'>
          <GuessesDraw />

          <WinLossMessage mt={2} />

          <Stats mt={8} />

          <Distribution mt={8} />

          <Stack
            px={4}
            mt={8}
            mb={8}
            direction={['column', 'row']}
            spacing={2}
            align='center'
            justify='space-between'
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
