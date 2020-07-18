import React from 'react'
import { render } from 'react-dom'
import { Banner, News } from './components'

const App = () => {
  return (
    <div>
      <Banner />
      <News />
    </div>
  )
}

render(<App />, document.getElementById('app'))
