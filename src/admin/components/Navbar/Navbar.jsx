import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import css from 'react-css-modules';
import cookies from 'cookies-js';
import { FormattedMessage } from 'react-intl';

import { Icon, Dropdown, DropdownItem } from 'ui';
import styles from './Navbar.sass';

class Navbar extends Component {

  static contextTypes = {
    user: PropTypes.object,
    router: PropTypes.object,
  }

  logOut = () => {
    cookies.expire('token');
    this.context.router.push('/admin/login');
  }

  render() {
    return (
      <nav styleName="nav">
        <div styleName="nav-pull-right">
          <Dropdown navItem pullRight trigger={<span><Icon icon="perm_identity" mr />{this.context.user.email}</span>}>
            <span onClick={this.logOut}>
              <DropdownItem>
                <Icon icon="power_settings_new" mr muted />
                <FormattedMessage
                  id="Log out"
                  defaultMessage="Log out"
                  />
              </DropdownItem>
            </span>
          </Dropdown>
        </div>
        <div styleName="logo"><Link to="/admin"><Icon icon="rate_review" x2/></Link></div>
        <Link activeClassName={styles.active} to="/admin/statisctics" styleName="nav-item"><Icon icon="multiline_chart" mr/>Статистика ответов</Link>
        <Link activeClassName={styles.active} to="/admin/editor" styleName="nav-item"><Icon icon="content_paste" mr/>Список вопросов</Link>
      </nav>
    );
  }
}

export default css(Navbar, styles, {allowMultiple: true});
