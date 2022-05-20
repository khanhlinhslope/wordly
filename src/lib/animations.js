import { GAME_CONFIG } from '@lib/constants'

export const getTotalAnimationTime = () => {
  const {
    revealAnimationTime,
    bounceAnimationTime,
    defaultWordLength: wordLength
  } = GAME_CONFIG

  const revealDuration = revealAnimationTime * wordLength
  const bounceDuration = wordLength * (bounceAnimationTime * 0.35)
  const totalDuration = revealDuration + bounceDuration

  return totalDuration
}
