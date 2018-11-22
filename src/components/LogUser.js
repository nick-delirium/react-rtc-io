import React from 'react';
import PropTypes from "prop-types";

const rand = function() {
  return Math.random().toString(36).substr(2); // remove `0.`
};

const token = function() {
  return rand() + rand(); // to make it longer
};

class LogUser extends React.Component {
    state = {
      userName: '',
    };
  handleInputChange = e => {
    this.setState({ userName: e.target.value });
  };
  submit = e => {
    if (e.keyCode === 13) {
      this.commit();
    }
  };
  commit = () => {
    const applyObject = {
      userName: this.state.userName,
      roomId: null
    }
    if (window.location.pathname === "/") {
      applyObject.roomId = token()
    }
    if (applyObject.userName.length === 0) return;
    this.props.dispatch(applyObject);
  };
  render() {
    return (
      <div className="login">
        <input
          autoFocus
          className="login-input"
          onChange={this.handleInputChange}
          placeholder="Your nickname"
          onKeyDown={this.submit}
        />
        <button className="login-button" onClick={this.commit}>
          Let's go!
        </button>
      </div>
    );
  }
}

LogUser.propTypes = {
  userName: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

export default LogUser;
