import React, { useState } from 'react'
import { render } from 'react-dom'
import Banner from './components/Banner'

const App = () => {
  return <Banner />
}

render(<App />, document.getElementById('app'))
