import { combineReducers } from "redux";

const init = {
  id: "",
  username: "",
  error: "",
  success: ""
};

const AuthReducer = (state = init, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username
      };

    case "LOGOUT_USER":
      return (state = init);

    case "SET_TIME_OUT":
      return { ...state, error: "", success: "", username: "" };

    case "LOGIN_ERROR":
      return { ...state, error: action.payload, success: "" };

    case "REGIST_ERROR":
      return { ...state, error: action.payload, success: "" };

    case "REGIST_SUCCESS":
      return { ...state, error: "", success: action.payload };

    default:
      return state;
  }
};

export default combineReducers({
  auth: AuthReducer
});
