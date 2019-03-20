import axios from "axios";
import cookies from "universal-cookie";

const cookie = new cookies();

export const onLoginClick = (user, pass) => {
  return dispatch => {
    axios
      .get("http://localhost:2000/users", {
        params: {
          username: user,
          password: pass
        }
      })
      .then(res => {
        if (res.data.length > 0) {
          const { id, username } = res.data[0];

          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { id, username }
          });

          cookie.set("masih_login", username, { path: "/" });
        } else {
          dispatch({
            type: "LOGIN_ERROR",
            payload: "Username and Password Incorrect"
          });
        }
      })
      .catch(err => {
        console.log("system error");
      });
  };
};

export const onRegistClick = (username, email, password) => {
  return dispatch => {
    axios
      .get("http://localhost:2000/users", {
        params: {
          username: username
        }
      })
      .then(res => {
        if (res.data.length === 0) {
          axios
            .post("http://localhost:2000/users", {
              username,
              email,
              password
            })
            .then(res => {
              dispatch({
                type: "REGIST_SUCCESS",
                payload: "Registrasi anda berhasil"
              });
            });
        } else {
          dispatch({
            type: "REGIST_ERROR",
            payload: "Username telah terdaftar"
          });
        }
      });
  };
};

export const onLogoutUser = () => {
  cookie.remove("masih_login");

  return { type: "LOGOUT_USER" };
};

export const onSetTimeOut = () => {
  return { type: "SET_TIME_OUT" };
};

export const keepLogin = username => {
  return dispatch => {
    axios
      .get("http://localhost:2000/users", {
        params: {
          username
        }
      })
      .then(res => {
        if (res.data.length !== 0) {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { username }
          });
        }
      });
  };
};
