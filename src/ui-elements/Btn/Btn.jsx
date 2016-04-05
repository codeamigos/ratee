import React, { Component, PropTypes } from 'react';

import css from 'react-css-modules';
import cx from 'classnames';

import styles from './Btn.sass';

class BtnOutline extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    outline: PropTypes.bool,
    lg: PropTypes.bool,
    sm: PropTypes.bool,
  }

  render() {
    const { text, outline, lg, sm } = this.props;

    const styleName = cx({
      btn: !outline,
      'btn-outline': outline,
      lg: lg,
      sm: sm,
    });

    return (
      <button styleName={styleName}>{text}</button>
    );
  }
}

export default css(BtnOutline, styles, {allowMultiple: true});
