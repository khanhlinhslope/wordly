import { Flex } from '@chakra-ui/react'
import Modal from '@components/Modal'
import { getTodayWordIndex } from '@lib/wotd'
import useStats from '@hooks/useStats'
import Stats from './Stats'
import Distribution from './Distribution'
import CountDown from './CountDown'
import GuessesDraw from './GuessesDraw'
import WinLossMessage from './WinLossMessage'
import useStore from '@lib/store'
import { GAME_CONFIG } from '@lib/constants'

const GameOverModal = ({ isOpen, onClose, ...rest }) => {
  const playerStats = useStats()
  const { inputIndex } = useStore()
  const { tries: maxTries, gameState } = GAME_CONFIG

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

          <Stats stats={playerStats} mt={8} />

          <Distribution stats={playerStats} mt={8} />

          <CountDown mt={8} pb={8} />
        </Flex>
      </Flex>
    </Modal>
  )
}

export default GameOverModal
