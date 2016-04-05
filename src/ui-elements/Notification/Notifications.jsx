/* @flow */

import React, { Component } from 'react';
import css from 'react-css-modules';
import styles from './_styles.sass';

@css(styles)
export default class Notifications extends Component {
  render() {
    return (
      <div styleName="notifications">
        {this.props.children}
      </div>
    );
  }
}
