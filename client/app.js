import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

import { hot } from 'react-hot-loader'


const App = () => {
  return (
    <div className="site">
      <Navbar />
      <Routes />
    </div>
  )
}

export default hot(module)(App)
