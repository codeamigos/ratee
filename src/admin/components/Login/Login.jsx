import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';
import cookies from 'cookies-js';
import { FormattedMessage } from 'react-intl';

import styles from './Login.sass';
import { Btn, Card, Input } from 'ui';

class Login extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }
  state = {
    email: '',
    password: '',
    isFail: false,
  }

  login = () => {
    const { email, password } = this.state;
    fetch('/api/authenticate', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    })
    .then( response => {
      return response.json();
    })
    .then(data => {
      cookies.set('token', data.token, {expires: data.expires});
      this.context.router.push('/admin');
    })
    .catch(ex => {
      console.log('parsing failed', ex);
    });
  }


  updateState = (name, newValue) => {
    this.setState({[name]: newValue});
  }

  render() {
    const { email, password } = this.state;

    return (
      <div styleName="admin">
        <h1 styleName="heading">
          <FormattedMessage
            id="Sign in to your account"
            defaultMessage="Sign in to your account"
            />
        </h1>
        <Card lg>
          <Input
            type="email"
            placeholder="your@email.com"
            name="email"
            onChange={this.updateState}
            value={email}
            />
          <Input
            type="password"
            placeholder="Пароль"
            name="password"
            onChange={this.updateState}
            value={password}
            />
          <Btn text="Вперед" outline block onClick={this.login} />
        </Card>
      </div>
    );
  }
}

export default css(Login, styles, {allowMultiple: true});
