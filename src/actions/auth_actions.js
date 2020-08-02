import { AsyncStorage } from "react-native";
import * as Facebook from "expo-facebook";
import firebase from "firebase";

import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL, LOG_OUT } from "./types";

export const logout = () =>{

}

export const facebookLogin = () => async (dispatch) => {
  let token = await AsyncStorage.getItem("fb_token");

  if (token) {
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    doFacebookLogin(dispatch);
    console.log("start fb login");
  }
};

const doFacebookLogin = async (dispatch) => {
  // Facebook.initializeAsync("300020044475971", "ScanApp");

  let { type, token } = await Facebook.logInWithReadPermissionsAsync(
    "300020044475971",
    {
      permissions: ["public_profile"],
    }
  );

  if (type === "cancel") {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  await AsyncStorage.setItem("fb_token", token);

  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
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


export const signout = () => {
  localStorage.removeItem('fb_token');

  return {
    type: LOG_OUT,
    payload: ''
  };
};