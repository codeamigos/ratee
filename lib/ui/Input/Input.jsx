import React, { Component, PropTypes } from 'react';

import css from 'react-css-modules';
import cx from 'classnames';

import styles from './Input.sass';

class Input extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    lg: PropTypes.bool,
    sm: PropTypes.bool,
    inline: PropTypes.bool,
  }

  static defaultProps = {
    value: '',
    placeholder: '',
    name: '',
  }

  onChange = (newValue) => {
    const { onChange, name } = this.props;
    onChange(name, newValue);
  }

  render() {
    const { type, placeholder, value, lg, sm, inline } = this.props;

    const styleNames = cx({
      input: true,
      sm: sm,
      lg: lg,
      inline: inline,
    });

    return (
      <input
        type={type}
        value={value}
        onChange={(e) => this.onChange(e.target.value)}
        placeholder={placeholder}
        styleName={styleNames}
      />
    );
  }
}

export default css(Input, styles, {allowMultiple: true});
