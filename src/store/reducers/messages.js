const messages = (state = [{message: "Feelin' empty a bit y'ah?", author: "system", id: 0}], action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return state
    case 'MESSAGE_RECEIVED':
      return state.concat([
        {
          message: action.message,
          author: action.author,
          id: action.id
        }
      ])
    default:
      return state
  }
}

export default messages