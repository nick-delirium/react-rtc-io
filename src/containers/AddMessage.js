import { connect } from 'react-redux';
import AddMessageComponent from '../components/AddMessage.js';
import { addMessage } from '../store/actions/messages.js';

const mapDispatchToProps = dispatch => ({
  dispatch: (message, when, author, path) => {
    dispatch(addMessage(message, when, author, path));
  },
});

export const AddMessage = connect(
  state => ({
    users: state.users,
    currentUser: state.currentUser,
    path: state.path,
  }),
  mapDispatchToProps
)(AddMessageComponent);
