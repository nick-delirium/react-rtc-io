let nextMessageId = 1;

export const addMessage = (message, when, author, path) => ({
  type: 'ADD_MESSAGE',
  id: nextMessageId++,
  message,
  when,
  author,
  path,
});
export const messageReceived = (message, when, author) => ({
  type: 'MESSAGE_RECEIVED',
  id: nextMessageId++,
  message,
  when,
  author,
});
