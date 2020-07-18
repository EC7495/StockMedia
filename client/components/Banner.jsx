import React, { useState, useEffect } from 'react'
import { AppBar, Typography } from '@material-ui/core'

const Banner = () => {
  const [hours, setHours] = useState(new Date().getHours())
  const [minutes, setMinutes] = useState(new Date().getMinutes())
  const [seconds, setSeconds] = useState(new Date().getSeconds())
  const [marketOpen, setMarketOpen] = useState(
    hours + minutes / 60 >= 9.5 && hours + minutes / 60 <= 16
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(new Date().getSeconds())
    }, 1000)

    if (seconds === 0) setMinutes(new Date().getMinutes())
    if (minutes === 0 && seconds === 0) setHours(new Date().getHours())
    if (!(hours + minutes / 60 >= 9.5 && hours + minutes / 60 <= 16))
      setMarketOpen(false)

    return () => {
      clearInterval(interval)
    }
  }, [seconds])

  return (
    <div>
      <AppBar style={{ backgroundColor: marketOpen ? 'green' : 'red' }}>
        <Typography variant="h1" align="center">
          The Market is {marketOpen ? 'Open' : 'Closed'}
        </Typography>
        <Typography variant="h2" align="center">
          {`${hours % 12 || 12}:${minutes >= 10 ? minutes : `0${minutes}`}:${
            seconds >= 10 ? seconds : `0${seconds}`
          } ${hours >= 12 ? 'PM' : 'AM'}`}
        </Typography>
      </AppBar>
    </div>
  )
}

export default Banner
