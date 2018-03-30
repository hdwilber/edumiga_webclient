import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './redux/configureStore'

import { Edumiga } from './containers';
import Routes from './routes'

import registerServiceWorker from './registerServiceWorker';
import "semantic-ui-css/semantic.min.css"

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter basename={process.env.PUBLIC_URL} history={history}>
      <Edumiga>
        <Routes/>
      </Edumiga>
    </ConnectedRouter>
  </Provider>,

  document.getElementById('root'))

registerServiceWorker();

