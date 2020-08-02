import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  LOG_OUT,
  // EMAIL_LOGIN_SUCCESS,
  // EMAIL_LOGIN_FAIL,
  // GOOGLE_LOGIN_SUCCESS,
  // GOOGLE_LOGIN_FAIL,
} from "../actions/types";
import firebase from "firebase";

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      // case EMAIL_LOGIN_SUCCESS:
      // case GOOGLE_LOGIN_SUCCESS:
      doFireBaseLogin(action.payload);

      return { token: action.payload };

    case FACEBOOK_LOGIN_FAIL:
      // case EMAIL_LOGIN_FAIL:
      // case GOOGLE_LOGIN_FAIL:
      return { token: null };

    case LOG_OUT:
      return { token: null };

    default:
      return state;
  }
};

const doFireBaseLogin = async (token) => {
  const credential = firebase.auth.FacebookAuthProvider.credential(token);

  // Sign in with credential from the Facebook user.
  firebase
    .auth()
    .signInWithCredential(credential)
    .catch((error) => {
      // alert(error);
      console.log(error);
    });
  console.log("firebase signed in");
};

export default authReducer;

