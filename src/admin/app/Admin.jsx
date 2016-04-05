require('../../ui-elements/styles/global.sass');
import css from 'react-css-modules';
// import cx from 'classnames';

import styles from './Admin.sass';

import Btn from 'Btn/Btn';
import Card from 'Card/Card';
import Input from 'Input/Input';

import React, { Component } from 'react';

class Admin extends Component {
  render() {
    return (
      <div styleName="admin">
        <h3 styleName="heading">Войти в аккаунт</h3>
        <Card lg>
          <Input type="text" placeholder="Логин" value="login" onChange={this.updateState} />
          <Input type="password" placeholder="Пароль" value="pass" onChange={this.updateState} />
          <Btn text="Вперед" outline block />
        </Card>
      </div>
    );
  }
}

export default css(Admin, styles, {allowMultiple: true});
