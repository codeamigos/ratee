import React, { Component, PropTypes } from 'react';

import Card from '../Card/Card';
import css from 'react-css-modules';
import cx from 'classnames';

import styles from './Dropdown.sass';

class Dropdown extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
    trigger: PropTypes.any.isRequired,
    mr: PropTypes.bool,
    ml: PropTypes.bool,
    navItem: PropTypes.bool,
    pullRight: PropTypes.bool,
  }

  toggleVisible = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  }

  state = {
    isVisible: false,
  }

  render() {
    const { children, trigger, mr, ml, navItem, pullRight } = this.props;
    const { isVisible } = this.state;

    const styleNames = cx({
      dropdown: true,
      visible: isVisible,
      mr: mr,
      ml: ml,
      navItem: navItem,
      pullRight: pullRight,
    });

    return (
      <div styleName={styleNames}>
        <span styleName="trigger" onClick={this.toggleVisible}>
          {trigger}
        </span>
        <div styleName="back" onClick={this.toggleVisible}></div>
        <div styleName="content">
          <Card sm shadow>
            {children}
          </Card>
        </div>
      </div>
    );
  }
}

export default css(Dropdown, styles, {allowMultiple: true});
