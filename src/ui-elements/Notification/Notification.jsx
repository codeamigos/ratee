/* @flow */

import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';
import Fa from '../Fa';
import styles from './_styles.sass';

@css(styles)
export default class Notification extends Component {
  static propTypes = {
    handleRemove: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string,
    text: PropTypes.string.isRequired,
    i: PropTypes.number.isRequired,
    timeout: PropTypes.number.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      counter: 0,
      isHidden: false,
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      const { counter } = this.state;
      const { i, handleRemove, timeout} = this.props;
      if (counter >= timeout) handleRemove(i);
      else this.setState({counter: counter + 500});
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { text, type, i, title} = this.props;
    const style = this.state.isHidden ? 'alert-hidden alert-' + type : 'alert-' + type;

    return (
        <div styleName={style} key={i}>
          <span
            styleName="close"
            onClick={() => this.props.handleRemove(i)}>
            <Fa icon="remove" />
          </span>
          { title !== '' && <b>{title}</b>}
          <p>{text}</p>
        </div>
    );
  }
}
