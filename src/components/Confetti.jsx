import { Box } from '@chakra-ui/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import ReactCanvasConfetti from 'react-canvas-confetti'
import { getAnimationSettings, canvasStyles } from 'utils/canvas'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export default function Confetti ({ launchFireworks }) {
  const refAnimationInstance = useRef(null)
  const [intervalId, setIntervalId] = useState()

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance
  }, [])

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(0.1, 0.3))
      refAnimationInstance.current(getAnimationSettings(0.7, 0.9))
    }
  }, [])

  const animate = useCallback(async () => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 400))

      await sleep(5000)

      clearInterval(intervalId)
      setIntervalId(null)
    }
  }, [intervalId, nextTickAnimation])

  useEffect(() => {
    return () => clearInterval(intervalId)
  }, [intervalId])

  useEffect(() => {
    if (launchFireworks) animate()
  }, [launchFireworks])

  return (
    <Box w='100%'>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </Box>
  )
}
