import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider} from 'react-intl';
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';

import Login from './components/Login/Login';
import Admin from './components/Admin/Admin';
import AdminStatistics from './components/AdminStatistics/AdminStatistics';
import AdminEditor from './components/AdminEditor/AdminEditor';

const messages = {
  'Sign in to your account': 'Войти в аккаунт',
  'Your question...': 'Ваш вопрос...',
};

const mountNode = document.getElementById('root');
ReactDOM.render(
  <IntlProvider locale="en" messages={messages}>
    <Router history={browserHistory}>
      <Route path="/admin/login" component={Login} />
      <Route component={Admin}>
        <Redirect from="/admin" to="/admin/statisctics" />
        <Route path="/admin/editor" component={AdminEditor} />
        <Route path="/admin/statisctics" component={AdminStatistics} />
      </Route>
    </Router>
  </IntlProvider>,
  mountNode
);
