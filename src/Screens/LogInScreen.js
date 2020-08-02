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

const SC_WIDTH = Math.round(Dimensions.get("window").width);
const SC_HEIGHT = Math.round(Dimensions.get("window").height);

const LogInScreen = () => {
  // const { state, signin, clearErrorMessage } = useContext(Context);   //requires redux

  return (
    <View>
      <ImageBackground
        source={require("../../assets/background2.png")}
        style={styles.ImageBackground}
      >
        <AuthForm
          headerText="SIGN IN WITH EMAIL"
          errorMessage="THERE WAS AN ERROR WITH LOGIN"
          onSubmit=""
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

export default LogInScreen;
