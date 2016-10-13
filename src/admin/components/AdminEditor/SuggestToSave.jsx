import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';
import { intlShape, injectIntl, defineMessages } from 'react-intl';
import cx from 'classnames';

import { Btn } from 'ui';

import styles from './SuggestToSave.sass';

const messages = defineMessages({
  btnTitle: {
    id: 'Save them',
    defaultMessage: 'Save them',
  },
  btnComment: {
    id: 'You\'ve made some changes.',
    defaultMessage: 'You\'ve made some changes.',
  },
});

class SuggestToSave extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    visible: PropTypes.bool.isRequired,
    onSave: PropTypes.func.isRequired,
  }

  render() {
    const {formatMessage} = this.props.intl;
    const {visible, onSave} = this.props;
    const styles = cx({
      container: true,
      visible: visible,
    });
    return (
      <div styleName={styles}>
        <span>{formatMessage(messages.btnComment)}</span> <Btn text={formatMessage(messages.btnTitle)} icon="save" ml outline onClick={onSave} />
      </div>
    );
  }
}

export default injectIntl(css(SuggestToSave, styles, {allowMultiple: true}));
