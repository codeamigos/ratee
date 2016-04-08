import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';

import { Input, Icon } from 'ui';
import styles from './Answer.sass';


class Answer extends Component {

  static propTypes = {
    placeholder: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onMoveup: PropTypes.func.isRequired,
    onMovedown: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
  }

  render() {
    const { placeholder, onChange, onDelete, onMoveup, onMovedown, name, value } = this.props;
    return (
      <div styleName="answer">
        <Input
          type="text"
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          value={value}
          />
        <span onClick={onMoveup} styleName="up"><Icon icon="arrow_upward" sm/></span>
        <span onClick={onDelete} styleName="delete"><Icon icon="delete_forever" sm/></span>
        <span onClick={onMovedown} styleName="down"><Icon icon="arrow_downward" sm/></span>
      </div>
    );
  }
}

export default css(Answer, styles, {allowMultiple: true});
