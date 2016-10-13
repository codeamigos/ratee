import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';
import cx from 'classnames';

import styles from './Switch.sass';


class Switch extends Component {

  static propTypes = {
    active: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.any,
    name: PropTypes.string.isRequired,
  }

  static defaultProps = {
    active: false,
    name: '',
  }

  toggle = () => {
    this.props.onChange(this.props.name, !this.props.active);
  }

  render() {
    const { label, active } = this.props;

    const styleNames = cx({
      switcher: true,
      active: active,
    });

    return (
      <div styleName="container" onClick={this.toggle} >
        <div styleName={styleNames}>
          <span styleName="round"></span>
        </div>
        {label &&
          <span styleName="label">{label}</span>}
      </div>
    );
  }
}

export default css(Switch, styles, {allowMultiple: true});
