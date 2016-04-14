import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';
import cx from 'classnames';

import styles from './Question.sass';
import { Circle, Icon } from 'ui';

class Question extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    number: PropTypes.number.isRequired,
    onMove: PropTypes.func,
    onSelect: PropTypes.func,
  }

  static defaultProps = {
    question: {
      id: 0,
      title: '-',
      type: '-',
      isActive: false,
    },
    number: 0,
    onMove: () => {},
    onSelect: () => {},
  }

  render() {
    const { number, onMove, onSelect } = this.props;
    const { title, id, isActive } = this.props.question;

    const styles = cx({
      question: true,
      active: isActive,
    });

    const circle = isActive ?
      <Circle white ml mr><Icon icon="star" /></Circle>
    :
      <Circle outline ml mr><Icon icon="star" /></Circle>;

    return (
      <div styleName={styles}>
        <div styleName="content" onClick={() => onSelect(id)}>
          <b styleName="number">{number}</b>
          {circle}
          <span styleName="title">{title}</span>
        </div>
        <span styleName="up" onClick={() => onMove('up', id)}><Icon icon="arrow_upward" sm/></span>
        <span styleName="down" onClick={() => onMove('down', id)}><Icon icon="arrow_downward" sm/></span>
      </div>
    );
  }
}

export default css(Question, styles, {allowMultiple: true});
