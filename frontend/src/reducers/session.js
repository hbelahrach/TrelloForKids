import { combineReducers } from "redux";

function authLoading(state = false, action) {
  switch (action.type) {
    case "AUTH_LOADING":
      return action.isLoading;
    default:
      return state;
  }
}

function authError(state = null, action) {
  switch (action.type) {
    case "AUTH_ERROR":
      return action.error;
    default:
      return state;
  }
}

function loggedIn(state = false, action) {
  switch (action.type) {
    case "LOGGED_IN":
      return action.isLoggedIn;
    default:
      return state;
  }
}

export default combineReducers({
  authLoading,
  authError,
  loggedIn
});
