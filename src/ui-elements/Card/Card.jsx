/* @flow */

import React, { Component, PropTypes } from 'react';

import css from 'react-css-modules';
import cx from 'classnames';

import styles from './Card.sass';

class Card extends Component {
  static propTypes = {
    dark: PropTypes.bool,
    lg: PropTypes.bool,
    sm: PropTypes.bool,
    children: PropTypes.any,
  }

  render() {
    const { dark, lg, sm } = this.props;

    const styles = cx({
      card: true,
      dark: dark,
      lg: lg,
      sm: sm,
    });

    return (
      <div styleName={styles}>
        {this.props.children}
      </div>
    );
  }
}

export default css(Card, styles, {allowMultiple: true});
