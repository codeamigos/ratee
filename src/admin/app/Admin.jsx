require('./Admin.sass');
import Btn from 'Btn/Btn';
import Input from 'Input/Input';

import React, { Component } from 'react';

export default class Admin extends Component {
  render() {
    return (
      <div>Hellow!
        <Input type="text" placeholder="Логин" value="login" onChange={this.updateState} />
        <Input type="password" placeholder="Пароль" value="pass" onChange={this.updateState} />
        <Btn text="Вперед" outline /></div>
    );
  }
}
