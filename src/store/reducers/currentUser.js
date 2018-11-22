const currentUser = (state = '', action) => {
  switch (action.type) {
    case 'APPLY_USER':
      return action.obj.userName;
    default:
      return state;
  }
};

export default currentUser;
