const path = (state = '', action) => {
  switch (action.type) {
    case 'SET_PATH':
      console.log(action.path);
      return action.path;
    default:
      return state;
  }
};

export default path;
