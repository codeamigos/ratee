import React, { Component } from 'react';
import css from 'react-css-modules';
import { FormattedMessage, intlShape, injectIntl, defineMessages } from 'react-intl';

import styles from './AdminEditor.sass';
import { Card, Btn, Input, Icon, Textarea, Switch, Space } from 'ui';

import Question from './Question';
import Answer from './Answer';

const messages = defineMessages({
  titlePlaceholder: {
    id: 'Your question...',
    defaultMessage: 'Your question...',
  },
  textareaPlaceholder: {
    id: 'Some additional info or comments (optional)',
    defaultMessage: 'Some additional info or comments (optional)',
  },
  answerPlaceholder: {
    id: 'An answer var',
    defaultMessage: 'An answer var',
  },
});

class AdminEditor extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
  }

  render() {
    const {formatMessage} = this.props.intl;

    return (
      <content styleName="content">
        <Card lg>
          <div styleName="questions">
            <h1>
              <FormattedMessage
              id="Quiz questions"
              defaultMessage="Quiz questions"
              />
            </h1>
            <Question />
            <Question />
            <Question />
            <Space />
            <Btn
              text={
                <FormattedMessage
                  id="Add another question"
                  defaultMessage="Add another question"
                  />}
              outline
              icon="playlist_add" />

          </div>
          <div styleName="editor">
            <h5>
              <b>
                <Icon icon="list" mr/>
                <FormattedMessage
                  id="Type: One of many"
                  defaultMessage="Type: One of many"
                  />
              </b>
            </h5>
            <Input
              type="text"
              placeholder={formatMessage(messages.titlePlaceholder)}
              name="question"
              onChange={() => false}
              lg
              />
            <Textarea
              placeholder={formatMessage(messages.textareaPlaceholder)}
              height="7em"
              name="question"
              onChange={() => false}
            ></Textarea>
          <Switch
            name="name"
            active
            onChange={() => false}
            label={
              <FormattedMessage
                id="Show question to the client"
                defaultMessage="Show question to the client"
                />
            }
            />
           <hr />
           <h5><b>
             <FormattedMessage
               id="Answers"
               defaultMessage="Answers"
               />
           </b></h5>
           <div>
             <Answer
               onChange={() => false}
               onDelete={() => false}
               onMoveup={() => false}
               onMovedown={() => false}
               name="answer"
               placeholder={formatMessage(messages.answerPlaceholder)}
                />
             <Answer
               onChange={() => false}
               onDelete={() => false}
               onMoveup={() => false}
               onMovedown={() => false}
               name="answer"
               placeholder={formatMessage(messages.answerPlaceholder)}
                />
             <Answer
               onChange={() => false}
               onDelete={() => false}
               onMoveup={() => false}
               onMovedown={() => false}
               name="answer"
               placeholder={formatMessage(messages.answerPlaceholder)}
                />
             </div>
             <Btn
               text={
                 <FormattedMessage
                   id="Add answer"
                   defaultMessage="Add answer"
                   />}
               outline
               sm
               icon="playlist_add" />
          </div>
        </Card>
      </content>
    );
  }
}

export default injectIntl(css(AdminEditor, styles, {allowMultiple: true}));
