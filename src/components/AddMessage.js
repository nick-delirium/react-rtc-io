import React from "react";
import PropTypes from "prop-types";

const AddMessage = (props) => {
  let input;
  console.log(props.currentUser)
  const sendMessage = e => {
    if (e.key === "Enter") {
      props.dispatch(input.value, props.currentUser, props.path);
      input.value = "";
    }
  }
  return (
    <section id="new-message">
      <textarea className='text-area'
        onKeyPress={sendMessage}
        placeholder="Your message..."
        type="text"
        ref={node => {
          input = node;
        }}
      />
    </section>
  );
};

AddMessage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default AddMessage;
