import React, { Component, PropTypes } from 'react';

import css from 'react-css-modules';
import cx from 'classnames';

import styles from './Input.sass';

class BtnOutline extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.text,
    lg: PropTypes.bool,
    sm: PropTypes.bool,
    inline: PropTypes.bool,
  }

  state = {
    value: '',
  }

  onChange = (valueToUpdate, newValue) => {
    const { onChange } = this.props;
    onChange(valueToUpdate, newValue);
    this.setState({value: newValue});
  }

  render() {
    const { value, type, placeholder, inline, lg, sm } = this.props;

    const styleName = cx({
      input: true,
      lg: lg,
      sm: sm,
      inline: inline,
    });

    return (
      <input
        type={type}
        value={this.state.value}
        onChange={(e) => this.onChange(value, e.target.value)}
        placeholder={placeholder ? placeholder : ''}
        styleName={styleName}
      />
    );
  }
}

export default css(BtnOutline, styles, {allowMultiple: true});
