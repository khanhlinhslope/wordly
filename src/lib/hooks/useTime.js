import { useCallback, useEffect, useState } from 'react'

const options = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true
}

const locale = 'en-US'

const useTime = () => {
  const [time, setTime] = useState(new Date())

  const formatTime = time => new Intl.DateTimeFormat(locale, options).format(time)

  const updateTime = useCallback(() => {
    setInterval(() => setTime(new Date()), 1000)
  }, [])

  useEffect(() => {
    updateTime()
  }, [updateTime])

  return formatTime(time)
}

export default useTime
