import {
  USER_LOGIN,
  LOGOUT,
  UPDATE_CONTACTS,
  CHANGE_ISCHATS,
  UPDATE_RIGHT_PANEL,
  UPDATE_CHAT,
  UPDATE_SEARCH_PHRASE,
} from "./Actions";

export default function reducer(state, action) {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { contacts: [], user: null };
    case UPDATE_CONTACTS:
      return { ...state, contacts: action.payload };
    case CHANGE_ISCHATS:
      return { ...state, isChats: action.payload };
    case UPDATE_RIGHT_PANEL:
      return {
        ...state,
        rightPanelChat: action.payload.chat,
        rightPanelContact: action.payload.contact,
      };
    case UPDATE_SEARCH_PHRASE:
      return {
        ...state,
        searchPhrase: action.payload,
      };
    case UPDATE_CHAT:
      return {
        ...state,
        rightPanelChat: action.payload.chat,
      };
    // case CREATE_CHAT:
    //   if (user)
    default:
      throw new Error();
  }
}
