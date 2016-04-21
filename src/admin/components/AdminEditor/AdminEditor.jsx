import React, { Component } from 'react';
import css from 'react-css-modules';

import styles from './AdminEditor.sass';
import { Card } from 'ui';

import Editor from './Editor';
import QuestionsList from './QuestionsList';
import SuggestToSave from './SuggestToSave';

class AdminEditor extends Component {
  state = {
    questions: questionsMok,
    editingQuestionId: null,
    suggestToSave: false,
  }

  viewQuestionDetails = (id) => {
    this.setState({editingQuestionId: id});
  }

  updateQuestion = (object) => {
    const { questions } = this.state;
    const currentPosition = questions.map(q => q.id).indexOf(object.id);
    if (currentPosition !== -1) {
      // mock
      questions.splice(currentPosition, 1);
      questions.splice(currentPosition, 0, object);
      this.setState({
        questions: questions,
        suggestToSave: true,
      });
    }
  }

  addQuestion = () => {
    const { questions } = this.state;
    // mock
    const newId =  Math.random() * 1000;
    questions.push({
      id: newId,
      title: '',
      subtitle: '',
      type: 'QuestionStars',
      isVisible: true,
      options: [],
    });
    this.setState({
      questions: questions,
      editingQuestionId: newId,
      suggestToSave: true,
    });
  }

  switchQuestionsIndex = (direction, id) => {
    const { questions } = this.state;
    let indexA = 0;
    let indexB = 0;

    const currentPosition = questions.map(q => q.id).indexOf(id);
    if (currentPosition !== -1) {
      switch (direction) {
      case 'up':
        if (currentPosition > 0) {
          indexA = currentPosition;
          indexB = currentPosition - 1;
        }
        break;
      default:
        if (currentPosition < questions.length - 1) {
          indexA = currentPosition;
          indexB = currentPosition + 1;
        }
      }
    }

    // mock
    const copyQuestions = questions.slice(0);
    const indexAelem = questions.slice(indexA)[0];
    copyQuestions.splice(indexA, 1);
    copyQuestions.splice(indexB, 0, indexAelem);
    this.setState({
      questions: copyQuestions,
      suggestToSave: true,
    });
  }

  render() {
    const { editingQuestionId, suggestToSave } = this.state;
    const questions = this.state.questions.map(q => {
      return (
      {
        ...q,
        isActive: editingQuestionId && q.id === editingQuestionId ? true : false,
      }
      );
    });

    return (
      <content styleName="content">
        <Card lg>
          <div styleName="left-column">
            <QuestionsList
              questions={questions}
              addQuestion={this.addQuestion}
              switchQuestionsIndex={this.switchQuestionsIndex}
              viewQuestionDetails={this.viewQuestionDetails}
              />
          </div>
          <div styleName="right-column">
            <Editor
              question={editingQuestionId && questions.filter(q => q.id === editingQuestionId)[0]}
              updateQuestion={this.updateQuestion}
            />
          </div>
        </Card>
        <SuggestToSave visible={suggestToSave} onSave={() => this.setState({suggestToSave: false})}/>
      </content>
    );
  }
}

const questionsMok = [
  {
    id: 1,
    title: 'Оцените пиццерию «Maya pizza»',
    subtitle: 'Че?',
    type: 'QuestionStars',
    isVisible: true,
    options: [
      'Ужас',
      'Плохо',
      'Пойдёт',
      'Хорошо',
      'Отлично!',
    ],
  },
  {
    id: 2,
    title: 'В какой «Майе» вы сегодня были?',
    subtitle: '',
    type: 'QuestionOneOfMany',
    isVisible: true,
    options: [
      'На Иркустком 42',
      'На Ленина 85а',
    ],

  },
  {
    id: 3,
    title: 'Как сегодня дела со скоростью обслуживания?',
    subtitle: '',
    type: 'QuestionOneOfMany',
    isVisible: true,
    options: [
      'все очень оперативно',
      'можно и побыстрее',
      'так себе, совсем небыстро',
      'устали ждать',
    ],

  },
  {
    id: 4,
    title: 'А как оценим работу и дружелюбность наших кассиров?',
    subtitle: '',
    type: 'QuestionOneOfMany',
    isVisible: true,
    options: [
      'великолепно',
      'хорошо, как обычно',
      'без энтузиазма',
      'невнимание, грубость, игнор',
    ],

  },
  {
    id: 5,
    title: 'Как вы оцените чистоту и порядок на месте?',
    subtitle: '',
    type: 'QuestionOneOfMany',
    isVisible: false,
    options: [
      'все блестит и сверкает',
      'в целом чисто, но не идеально',
      'неопрятно, много замечаний',
      'полный бардак',
    ],

  },
  {
    id: 6,
    title: 'А как вам внешний вид нашего кассира?',
    subtitle: '',
    type: 'QuestionOneOfMany',
    isVisible: true,
    options: [
      'красотка/красавец!',
      'нормально',
      'неряшливый',
      'отталкивающий',
    ],

  },
  {
    id: 7,
    title: 'Довольны ли вы качеством наших блюд?',
    subtitle: '',
    type: 'QuestionOneOfMany',
    isVisible: true,
    options: [
      'супер!',
      'хорошо',
      'средненько, бывало и лучше',
      'плохо, я недоволен',
    ],

  },
  {
    id: 8,
    title: 'Хотите что-то добавить к ответам?',
    subtitle: 'Нам это очень важно знать',
    type: 'QuestionInputText',
    isVisible: true,
    options: [
      'textarea',
    ],
  },
  {
    id: 9,
    title: 'Спасибо, что помогаете нам стать еще лучше!',
    subtitle: 'Оставьте контакты, чтобы мы могли с вами связаться',
    type: 'QuestionInputText',
    isVisible: true,
    options: [
      'Имя',
      'E-mail',
      'Телефон',
    ],
  },
];


export default css(AdminEditor, styles, {allowMultiple: true});
