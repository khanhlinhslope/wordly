import { Flex } from '@chakra-ui/react'
import Modal from '@components/Modal'
import { getTodayWordIndex } from '@lib/wotd'
import useStats from '@hooks/useStats'
import Stats from './Stats'
import Distribution from './Distribution'
import CountDown from './CountDown'
import GuessesDraw from './GuessesDraw'
import WinLossMessage from './WinLossMessage'

const GameOverModal = ({ isOpen, onClose, ...rest }) => {
  const playerStats = useStats()

  const todayWordIndex = getTodayWordIndex()
  const title = `Wordly #${todayWordIndex + 1}`

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
      <Flex
        flexDir='row'
        justify='center'
        w='100%'
        // pb={4}
        // border='2px solid purple'
      >
        <Flex
          flexDir='column'
          w='100%'
          maxW='600px'
          // border='2px solid pink'
        >
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
