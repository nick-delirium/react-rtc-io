const users = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_USERS':
      return action.arr;
    case 'ADD_USER':
      return state.concat([{ name: action.name }]);
    case 'REMOVE_USER':
      return state.filter(item => item.name !== action.name);
    default:
      return state;
  }
};

export default users;
