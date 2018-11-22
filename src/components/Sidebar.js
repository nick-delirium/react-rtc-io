import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = ({ users }) => (
  <aside id="sidebar" className="sidebar">
    <h4 className="header">Users in this chatroom:</h4>
    <ul>
      {users.map((user, i) => (
        <li key={i}>{user.name}</li>
      ))}
    </ul>
  </aside>
);

Sidebar.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default Sidebar;
