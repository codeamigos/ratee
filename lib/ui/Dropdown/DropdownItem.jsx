import React, { Component, PropTypes } from 'react';

import css from 'react-css-modules';
import cx from 'classnames';

import styles from './Dropdown.sass';

class Dropdown extends Component {

  static propTypes = {
    children: PropTypes.any,
  }

  render() {
    const { children } = this.props;

    const styleNames = cx({
      item: true,
    });

    return (
      <div styleName={styleNames}>
        {children}
      </div>
    );
  }
}

export default css(Dropdown, styles, {allowMultiple: true});
