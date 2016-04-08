import React, { Component } from 'react';
import css from 'react-css-modules';
import moment from 'moment';

import styles from './AdminStatistics.sass';
import { Btn, Dropdown } from 'ui';

import Sidebar from '../Sidebar/Sidebar';
import Feedback from './Feedback';

class AdminStatistics extends Component {

  state = {
    dateFrom: moment().subtract(7, 'days'),
    dateTo: moment(),
  }

  render() {
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
