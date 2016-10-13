import React, { Component, PropTypes } from 'react';
import { intlShape, injectIntl, defineMessages } from 'react-intl';

import { Btn, Space } from 'ui';
import Question from './Question';

const messages = defineMessages({
  title: {
    id: 'Quiz questions',
    defaultMessage: 'Quiz questions',
  },
  btnAddQuestion: {
    id: 'Add another question',
    defaultMessage: 'Add another question',
  },
  emptyQuiz: {
    id: 'There are no questions in this quiz. Go ahead, add the first one.',
    defaultMessage: 'There are no questions in this quiz. Go ahead, add the first one.',
  },
});

class QuestionsList extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    switchQuestionsIndex: PropTypes.func.isRequired,
    viewQuestionDetails: PropTypes.func.isRequired,
    addQuestion: PropTypes.func.isRequired,
    questions: PropTypes.array,
  }

  static defaultProps = {
    questions: [],
    switchQuestionsIndex: () => {},
    viewQuestionDetails: () => {},
    addQuestion: () => {},
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { questions, viewQuestionDetails, switchQuestionsIndex, addQuestion } = this.props;

    return (
      <div style={{positon: 'relative'}}>
        <h1>
          {formatMessage(messages.title)}
        </h1>
        <div>
          { questions.length > 1 ?
            questions.map((q, i) =>
              <Question
                onMove={switchQuestionsIndex}
                onSelect={viewQuestionDetails}
                key={i + '-question'}
                question={q}
                number={i + 1} />
            )
          :
            <div>{formatMessage(messages.emptyQuiz)}</div>
          }
        </div>
        <Space />
        <Btn text={formatMessage(messages.btnAddQuestion)} onClick={addQuestion} outline icon="playlist_add" />
      </div>
    );
  }
}

export default injectIntl(QuestionsList);
