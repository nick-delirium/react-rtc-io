let nextMessageId = 1;

export const addMessage = (message, author, path) => ({
  type: 'ADD_MESSAGE',
  id: nextMessageId++,
  message,
  author,
  path,
});
export const messageReceived = (message, author) => ({
  type: 'MESSAGE_RECEIVED',
  id: nextMessageId++,
  message,
  author,
});
