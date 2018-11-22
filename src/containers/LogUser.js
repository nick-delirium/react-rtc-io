import { connect } from 'react-redux';
import LogUserComponent from '../components/LogUser.js';
import { applyUser } from '../store/actions/applyUser.js';
import { addUser } from '../store/actions/addUser.js';

const mapDispatchToProps = dispatch => ({
  dispatch: applyObj => {
    dispatch(applyUser(applyObj));
    dispatch(addUser(applyObj.userName));
  },
});

export const LogUser = connect(
  () => ({}),
  mapDispatchToProps
)(LogUserComponent);
