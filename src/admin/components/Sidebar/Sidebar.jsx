import React, { Component } from 'react';
import { Link } from 'react-router';
import css from 'react-css-modules';

import { Icon } from 'ui';
import styles from './Sidebar.sass';

class Sidebar extends Component {
  render() {
    return (
      <nav styleName="nav-side">
        <div styleName="nav-header">
          <img src="http://cs606518.vk.me/v606518022/31c0/oJSjUCTjoYg.jpg" styleName="img-circle" />
          <h2 styleName="title">
            <small>Компания</small>
            <br/>Перчини
          </h2>
        </div>
        <div styleName="nav-divider"></div>
        <Link to="/admin/statisctics" activeClassName={styles.active} styleName="nav-item"><Icon icon="chat" muted mr/>Последние обновления</Link>
        <Link to="/admin" styleName="nav-item"><Icon icon="show_chart" muted mr/>Статистика ответов</Link>
        <Link to="/admin" styleName="nav-item"><Icon icon="date_range" muted mr/>Таблица ответов</Link>
        <Link to="/admin" styleName="nav-item"><Icon icon="slow_motion_video" muted mr/>Показатели кампании</Link>
      </nav>
    );
  }
}

export default css(Sidebar, styles, {allowMultiple: true});
