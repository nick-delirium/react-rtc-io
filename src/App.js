import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import { LogUser } from './containers/LogUser.js';
import { Sidebar } from './containers/Sidebar.js';
import { MessagesList } from './containers/MessagesList.js';
import { AddMessage } from './containers/AddMessage.js';

class App extends Component {
  state = {
    connection: false,
    timestamp: null,
  };
  render() {
    const { users } = this.props;
    if (users.length === 0) {
      return <LogUser />;
    }
    return (
      <div id="container">
        <Sidebar />
        <section id="main">
          <MessagesList />
          <AddMessage />
        </section>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({ users });

export default connect(mapStateToProps)(App);
