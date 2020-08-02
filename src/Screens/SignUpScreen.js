import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import AuthForm from "../context/Authform";
import { NavigationEvents } from "react-navigation";
import firebase from "firebase";

const SC_WIDTH = Math.round(Dimensions.get("window").width);
const SC_HEIGHT = Math.round(Dimensions.get("window").height);

const SignUpScreen = () => {
//   const { state, signin, clearErrorMessage } = useContext(Context);   //requires redux

//   const signUpUser = ({email,password}) => {
//     firebase.auth().createUserWithEmailAndPassword(email, password);
//     console.log("password", password);
//   };

  return (
    <View>
      <ImageBackground
        source={require("../../assets/background2.png")}
        style={styles.ImageBackground}
      >
        <AuthForm
          headerText="SIGN UP WITH EMAIL"
          errorMessage="THERE WAS AN ERROR WITH SINGUP"
        //   onSubmit={signUpUser}
          submitButtonText="SUBMIT"
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  ImageBackground: {
    position: "relative",
    alignItems: "center",
    width: SC_WIDTH,
    height: SC_HEIGHT,
  },
});

export default SignUpScreen;
