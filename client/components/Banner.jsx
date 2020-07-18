import React, { useState, useEffect } from 'react'
import { AppBar, Typography } from '@material-ui/core'
import io from 'socket.io-client'

const socket = io()

const Banner = () => {
  const [hours, setHours] = useState(new Date().getHours())
  const [minutes, setMinutes] = useState(new Date().getMinutes())
  const [seconds, setSeconds] = useState(new Date().getSeconds())
  const [marketOpen, setMarketOpen] = useState(
    hours + minutes / 60 >= 9.5 &&
      hours + minutes / 60 <= 16 &&
      new Date().getDay() <= 5
  )

  socket.on('connect', () => console.log('We live'))

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(new Date().getSeconds())
      setMinutes(new Date().getMinutes())
      setHours(new Date().getHours())
    }, 1000)

    if (
      !(hours + minutes / 60 >= 9.5 && hours + minutes / 60 <= 16) &&
      marketOpen
    )
      setMarketOpen(false)
    else if (
      hours + minutes / 60 >= 9.5 &&
      hours + minutes / 60 <= 16 &&
      new Date().getDay() <= 5 &&
      !maketOpen
    )
      setMarketOpen(true)

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
