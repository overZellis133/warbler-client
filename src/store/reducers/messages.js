import { LOAD_MESSAGES, REMOVE_MESSAGE, UPDATE_MESSAGE} from '../actionTypes';

const message = (state = [], action) => {
  switch (action.type) {
    case LOAD_MESSAGES:
      return [...action.messages];
    case REMOVE_MESSAGE:
      return state.filter(message => message._id !== action.id);
    case UPDATE_MESSAGE:
      return state.map(message => {
        if (message._id !== action.id) {
          return message;
        }
        return {...message, text: action.text};
      });
    default:
      return state;
  }
};

export default message;
