import React, { Component, PropTypes } from 'react';

import css from 'react-css-modules';
import cx from 'classnames';

import styles from './Textarea.sass';

class Textarea extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    height: PropTypes.string,
    lg: PropTypes.bool,
    sm: PropTypes.bool,
    inline: PropTypes.bool,
    mr: PropTypes.bool,
    ml: PropTypes.bool,
  }

  static defaultProps = {
    value: '',
    placeholder: '',
  }

  onChange = (valueToUpdate, newValue) => {
    const { onChange } = this.props;
    onChange(valueToUpdate, newValue);
  }

  render() {
    const { name, placeholder, height, value, lg, sm, mr, ml } = this.props;

    const styleNames = cx({
      input: true,
      lg: lg,
      sm: sm,
      mr: mr,
      ml: ml,
    });

    return (
      <textarea style={{height}}
        onChange={(e) => this.onChange(name, e.target.value)}
        value={value}
        placeholder={placeholder}
        styleName={styleNames}
      />
    );
  }
}

export default css(Textarea, styles, {allowMultiple: true});
