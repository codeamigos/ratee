import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';
import cx from 'classnames';

import styles from './Circle.sass';

class Circle extends Component {

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

  toggleVisible = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  }

  render() {
    const { children, outline, white, mr, ml, lg, sm, xs } = this.props;

    const styleNames = cx({
      circle: outline || white ? false : true,
      outline: outline,
      white: white,
      mr: mr,
      ml: ml,
      lg: lg,
      sm: sm,
      xs: xs,
    });

    return (
      <div styleName={styleNames}>
        {children}
      </div>
    );
  }
}

export default css(Circle, styles, {allowMultiple: true});
