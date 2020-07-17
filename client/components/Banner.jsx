import React, { useState, useEffect } from 'react'

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
    if (minutes === 0) setHours(new Date().getHours())

    return () => {
      clearInterval(interval)
    }
  }, [seconds])

  return marketOpen ? (
    <div>
      <h1 style={{ color: 'green' }}>The market is open</h1>
      <h2>
        {`${hours % 12 || 12}:${minutes >= 10 ? minutes : `0${minutes}`}:${
          seconds >= 10 ? seconds : `0${seconds}`
        } ${hours >= 12 ? 'PM' : 'AM'}`}
      </h2>
    </div>
  ) : (
    <div>
      <h1 style={{ color: 'red' }}>The market is closed</h1>
      <h2>{`${hours % 12 || 12}:${minutes >= 10 ? minutes : `0${minutes}`}:${
        seconds >= 10 ? seconds : `0${seconds}`
      } ${hours >= 12 ? 'PM' : 'AM'}`}</h2>
    </div>
  )
}

export default Banner
