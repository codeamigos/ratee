import React, { Component, PropTypes } from 'react';

import css from 'react-css-modules';
import cx from 'classnames';

import Icon from '../Icon/Icon';
import styles from './Btn.sass';

class Btn extends Component {
  static propTypes = {
    text: PropTypes.any.isRequired,
    onClick: PropTypes.func,
    outline: PropTypes.bool,
    block: PropTypes.bool,
    icon: PropTypes.string,
    lg: PropTypes.bool,
    sm: PropTypes.bool,
    xs: PropTypes.bool,
    mr: PropTypes.bool,
    ml: PropTypes.bool,
  }

  static defaultProps = {
    onClick: () => {},
  }

  render() {
    const { text, icon, onClick, outline, lg, sm, xs, block, mr, ml } = this.props;

    const styleNames = cx({
      btn: outline ? false : true,
      outline: outline,
      block: block,
      lg: lg,
      sm: sm,
      xs: xs,
      mr: mr,
      ml: ml,
    });

    return (
      <button styleName={styleNames} onClick={onClick}>
        {icon &&
          <Icon icon={icon} mr />}
        {text}
      </button>
    );
  }
}

export default css(Btn, styles, {allowMultiple: true});
