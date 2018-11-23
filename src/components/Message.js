import React from "react";
import PropTypes from "prop-types";

const Message = ({ message, when, author }) => (
  <p>
    <i>{when}&nbsp;</i><b>{author}</b>: {message}
  </p>
);

Message.propTypes = {
  message: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default Message;
