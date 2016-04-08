import React, { Component } from 'react';
import css from 'react-css-modules';
import styles from './Question.sass';

import { Circle, Icon } from 'ui';

class Question extends Component {
  render() {
    return (
      <div styleName="question">
        <b styleName="number">1</b>
        <Circle outline ml mr><Icon icon="star" /></Circle>
        <span styleName="title">Довольны ли вы качеством наших блюд?</span>
        <span styleName="up"><Icon icon="arrow_upward" sm/></span>
        <span styleName="down"><Icon icon="arrow_downward" sm/></span>
      </div>
    );
  }
}

export default css(Question, styles, {allowMultiple: true});
