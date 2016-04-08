/* @flow */

import React, { Component } from 'react';
import css from 'react-css-modules';

import { Card, Circle, Pill, Progress } from 'ui';
import styles from './Feedback.sass';

class Feedback extends Component {
  render() {
    return (
      <Card>
        <h2><Circle mr outline>1</Circle> Довольны ли вы качеством наших блюд? <Pill ml sm>182 ответа</Pill></h2>
        <table styleName="results">
          <tbody>
            <tr>
              <td>Все блестит и сверкает</td>
              <td><Progress width={56} /></td>
              <td>56%</td>
              <td><small>26 ответов</small></td>
            </tr>
            <tr>
              <td>Все блестит и сверкает</td>
              <td><Progress width={56} /></td>
              <td>56%</td>
              <td><small>26 ответов</small></td>
            </tr>
            <tr>
              <td>Все блестит и сверкает</td>
              <td><Progress width={56} /></td>
              <td>56%</td>
              <td><small>26 ответов</small></td>
            </tr>
            <tr>
              <td>Все блестит и сверкает</td>
              <td><Progress width={56} /></td>
              <td>56%</td>
              <td><small>26 ответов</small></td>
            </tr>
          </tbody>
        </table>
      </Card>
    );
  }
}

export default css(Feedback, styles, {allowMultiple: true});
