import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';
import cx from 'classnames';

import styles from './Pill.sass';

class Pill extends Component {

  static propTypes = {
    children: PropTypes.any,
    outline: PropTypes.bool,
    white: PropTypes.bool,
    mr: PropTypes.bool,
    ml: PropTypes.bool,
    lg: PropTypes.bool,
    sm: PropTypes.bool,
    xs: PropTypes.bool,
  }

  render() {
    const { children, white, outline, mr, ml, sm, xs, lg} = this.props;

    const styleNames = cx({
      pill: outline || white ? false : true,
      outline: outline,
      white: white,
      lg: lg,
      sm: sm,
      xs: xs,
      mr: mr,
      ml: ml,
    });

    return (
      <div styleName={styleNames}>
        {children}
      </div>
    );
  }
}

export default css(Pill, styles, {allowMultiple: true});
