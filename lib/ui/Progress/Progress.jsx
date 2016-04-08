import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';
import cx from 'classnames';

import styles from './Progress.sass';

class Progress extends Component {

  static propTypes = {
    width: PropTypes.any.isRequired,
    mr: PropTypes.bool,
    ml: PropTypes.bool,
    lg: PropTypes.bool,
    sm: PropTypes.bool,
    xs: PropTypes.bool,
  }

  render() {
    const { width, mr, ml, lg, sm, xs} = this.props;

    const styleNames = cx({
      progress: true,
      lg: lg,
      sm: sm,
      xs: xs,
      mr: mr,
      ml: ml,
    });

    return (
      <div styleName={styleNames}>
        <div styleName="bar" style={{width: width + '%'}}></div>
      </div>
    );
  }
}

export default css(Progress, styles, {allowMultiple: true});
