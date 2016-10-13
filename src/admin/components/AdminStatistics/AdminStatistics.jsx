import React, { Component } from 'react';
import css from 'react-css-modules';
import moment from 'moment';
import { flatten } from 'lodash';

import styles from './AdminStatistics.sass';
import { Btn, Dropdown } from 'ui';

import Sidebar from '../Sidebar/Sidebar';
import Feedback from './Feedback';

class AdminStatistics extends Component {

  state = {
    feedbacks: feedbacksMok,
    dateFrom: moment().subtract(7, 'days'),
    dateTo: moment(),
  }

  render() {
    console.log(prepareFeedbacks(this.state.feedbacks));

    return (
      <div>
        <Sidebar />
        <content styleName="content">
          <h3>
            Период
              <Dropdown ml trigger={<Btn text={this.state.dateFrom.format('DD/MM/YY')} icon="date_range" xs/>}>
                Календарь епта
              </Dropdown>
          </h3>
          <Feedback />
          <Feedback />
          <Feedback />
        </content>
      </div>
    );
  }
}
export default css(AdminStatistics, styles, {allowMultiple: true});

function prepareFeedbacks(feedbacks) {
  let answers = [];
  if (feedbacks && feedbacks.length > 1) {
    answers = flatten(feedbacks.map(f =>
      f.answers.map(a => ({
        question: a.question.title,
        answer: a.answer,
      }))
    ));
  }
  return answers;
}


const feedbacksMok = [
  {
    id: 'f1',
    customer: {
      id: 'c1',
      email: '',
      phone: '89234553434',
    },
    answers: [
      {
        question: {
          title: 'Как сегодня дела со скоростью обслуживания?',
          subtitle: '',
          type: 'QuestionOneOfMany',
        },
        answer: 'все очень оперативно',
      },
      {
        question: {
          title: 'А как оценим работу и дружелюбность наших кассиров?',
          subtitle: '',
          type: 'QuestionOneOfMany',
        },
        answer: 'без энтузиазма',
      },
      {
        question: {
          title: 'Как вы оцените чистоту и порядок на месте?',
          subtitle: '',
          type: 'QuestionOneOfMany',
        },
        answer: 'все блестит и сверкает',
      },
    ],
    createdAt: 'Fri Apr 22 2016 00:44:13 GMT+0600 (NOVT)',
  },
  {
    id: 'f2',
    customer: {
      id: 'c2',
      email: '',
      phone: '89234553435',
    },
    answers: [
      {
        question: {
          title: 'Как сегодня дела со скоростью обслуживания?',
          subtitle: '',
          type: 'QuestionOneOfMany',
        },
        answer: 'можно и побыстрее',
      },
      {
        question: {
          title: 'А как оценим работу и дружелюбность наших кассиров?',
          subtitle: '',
          type: 'QuestionOneOfMany',
        },
        answer: 'без энтузиазма',
      },
    ],
    createdAt: 'Fri Apr 22 2016 00:43:03 GMT+0600 (NOVT)',
  },
];
