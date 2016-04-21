import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';
import { intlShape, injectIntl, defineMessages } from 'react-intl';
import { Motion, spring } from 'react-motion';

import { Btn, Input, Icon, Textarea, Switch } from 'ui';

import styles from './AdminEditor.sass';
import Answer from './Answer';

const messages = defineMessages({
  title: {
    id: 'Type: One of many',
    defaultMessage: 'Type: One of many',
  },
  answersTitle: {
    id: 'Answers',
    defaultMessage: 'Answers',
  },
  titlePlaceholder: {
    id: 'Your question...',
    defaultMessage: 'Your question...',
  },
  textareaPlaceholder: {
    id: 'Some additional info or comments (optional)',
    defaultMessage: 'Some additional info or comments (optional)',
  },
  switchTitle: {
    id: 'Show question to the client',
    defaultMessage: 'Show question to the client',
  },
  answerPlaceholder: {
    id: 'An answer var',
    defaultMessage: 'An answer var',
  },
  addButton: {
    id: 'Add answer',
    defaultMessage: 'Add answer',
  },
});

class Editor extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    question: PropTypes.object,
    updateQuestion: PropTypes.func.isRequired,
  }

  static defaultProps = {
    question: {
      title: '',
      subtitle: '',
      type: '-',
      isVisible: false,
      options: [],
    },
    updateQuestion: () => {},
  }

  handleChange = (param, value) => {
    const { question, updateQuestion } = this.props;
    let newParam = {};
    switch (param) {
    case 'title':
      newParam = {title: value};
      break;
    case 'subtitle':
      newParam = {subtitle: value};
      break;
    case 'isVisible':
      newParam = {isVisible: value};
      break;
    case 'options':
      newParam = {options: value};
      break;
    default:
      console.log('Unknown param');
      break;
    }
    updateQuestion({...question, ...newParam});
  }

  updateOptions = (index, action) => (_, value = '') => {
    const { options } = this.props.question;
    switch (action) {
    case 'add':
      options.push('');
      break;
    case 'delete':
      options.splice(index, 1);
      break;
    case 'edit':
      options[index] = value;
      break;
    case 'moveup':
      if (index !== 0) {
        options.splice(index - 1, 0, options.splice(index, 1)[0]);
      }
      break;
    case 'movedown':
      if (index !== options.length - 1) {
        options.splice(index + 1, 0, options.splice(index, 1)[0]);
      }
      break;
    default:
      console.log('Unknown action');
      break;
    }
    this.handleChange('options', options);
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { question } = this.props;

    if (question) {
      return (
        <Motion
          defaultStyle={{opacity: 0}}
          style={{opacity: spring(1)}}>
          {({opacity}) =>
          <div style={{position: 'relative', opacity: opacity, transform: `translate3d(0, ${-50 + 50 * opacity}px, 0)`}} >
            <h5>
              <b>
                <Icon icon="list" mr/>
                {formatMessage(messages.title)}
              </b>
            </h5>
            <Input
              type="text"
              focus={question.title === '' ? true : false}
              placeholder={formatMessage(messages.titlePlaceholder)}
              name="title"
              value={question.title}
              onChange={this.handleChange}
              lg
              />
            <Textarea
              placeholder={formatMessage(messages.textareaPlaceholder)}
              height="7em"
              name="subtitle"
              value={question.subtitle}
              onChange={this.handleChange}
            ></Textarea>
            <Switch
              name="isVisible"
              active={question.isVisible}
              onChange={this.handleChange}
              label={formatMessage(messages.switchTitle)}
              />
             <hr />
             <h5>
               <b>
                 {formatMessage(messages.answersTitle)}
              </b>
             </h5>
             <div>
               {question.options.map((o, i) =>
                 <Answer
                   key={i}
                   value={o}
                   onChange={this.updateOptions(i, 'edit')}
                   onDelete={this.updateOptions(i, 'delete')}
                   onMoveup={this.updateOptions(i, 'moveup')}
                   onMovedown={this.updateOptions(i, 'movedown')}
                   name="answer"
                   placeholder={formatMessage(messages.answerPlaceholder)}
                   />
               )}
            </div>
            <Btn
              text={formatMessage(messages.addButton)}
              onClick={this.updateOptions(0, 'add')}
              outline
              sm
              icon="playlist_add" />
            </div>
           }
         </Motion>
      );
    }
  }
}

export default injectIntl(css(Editor, styles, {allowMultiple: true}));
