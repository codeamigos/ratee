import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';
import cx from 'classnames';

import styles from './Space.sass';


class Space extends Component {

  static propTypes = {
    x2: PropTypes.bool,
    x3: PropTypes.bool,
    x4: PropTypes.bool,
    x5: PropTypes.bool,
    h2: PropTypes.bool,
    h4: PropTypes.bool,
  }

  render() {
    const { x2, x3, x4, x5, h2, h4 } = this.props;

    const styleNames = cx({
      x1: true,
      x2: x2,
      x3: x3,
      x4: x4,
      x5: x5,
      h2: h2,
      h4: h4,
    });

    return (
      <div styleName={styleNames}></div>
    );
  }
}

export default css(Space, styles, {allowMultiple: true});
