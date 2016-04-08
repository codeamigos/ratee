import React, { Component, PropTypes } from 'react';
import cookies from 'cookies-js';

import Navbar from '../Navbar/Navbar';

export default class Admin  extends Component {

  state = {
    user: null,
  }

  static childContextTypes = {
    user: PropTypes.object,
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  getChildContext() {
    return {
      user: this.state.user,
    };
  }

  componentWillMount() {
    if (!cookies.get('token')) {
      this.context.router.push('/admin/login');
    }
  }

  componentDidMount() {
    fetch('/api/user', {
      method: 'get',
      headers: {
        'X-Auth': cookies.get('token'),
        'Content-Type': 'application/json',
      },
    })
    .then( response => {
      return response.json();
    })
    .then(data => {
      this.setState({user: data});
    })
    .catch(ex => {
      console.log('User parsing failed', ex);
    });
  }

  render() {
    if (!this.state.user) {
      return <div>Loading</div>;
    }

    return (
      <div>
        <Navbar />
        <section>
          {this.props.children}
        </section>
      </div>
    );
  }
}
