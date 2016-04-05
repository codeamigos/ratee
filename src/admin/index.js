import React from 'react';
import ReactDOM from 'react-dom';
// import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import Admin from './app/Admin';

// import routes from './routes';


// const history = createBrowserHistory();
const mountNode = document.getElementById('root');

ReactDOM.render(
  <Admin />,
  mountNode
);
