/* @flow */

import React, { Component, PropTypes } from 'react';

import css from 'react-css-modules';
import cx from 'classnames';

import styles from './Card.sass';

class Card extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    dark: PropTypes.bool,
    lg: PropTypes.bool,
    sm: PropTypes.bool,
    shadow: PropTypes.bool,
  }

  render() {
    const { children, dark, lg, sm, shadow } = this.props;

    const styleNames = cx({
      card: true,
      dark: dark,
      lg: lg,
      sm: sm,
      shadow: shadow,
    });

    return (
      <div styleName={styleNames}>
        {children}
      </div>
    );
  }
}

export default css(Card, styles, {allowMultiple: true});
