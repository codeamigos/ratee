import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';
import cx from 'classnames';

import styles from './Icon.sass';

class Icon extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    mr: PropTypes.bool,
    ml: PropTypes.bool,
    muted: PropTypes.bool,
    sm: PropTypes.bool,
    x2: PropTypes.bool,
    x3: PropTypes.bool,
    x4: PropTypes.bool,
  }

  render() {
    const { icon, mr, ml, muted, x2, x3, x4, sm } = this.props;

    const styleNames = cx({
      icon: true,
      mr: mr,
      ml: ml,
      muted: muted,
      x2: x2,
      x3: x3,
      x4: x4,
      sm: sm,

    });

    return (
      <i styleName={styleNames} className="material-icons">{icon}</i>
    );
  }
}

export default css(Icon, styles, {allowMultiple: true});
