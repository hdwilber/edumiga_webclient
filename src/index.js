import React from 'react';
import ReactDOM from 'react-dom';
import { Edumiga } from './containers';
import registerServiceWorker from './registerServiceWorker';
import "semantic-ui-css/semantic.css"

ReactDOM.render(
  <Edumiga />, 
  document.getElementById('root'));
registerServiceWorker();
