import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import './style/index.scss'

// establishes socket connection
import './socket'

// const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
    document.getElementById('app')
  )
// }

// render()

// if (module.hot) {
//   module.hot.accept('./app', render);
// }
