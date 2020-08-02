import firebase from "firebase";
import * as Facebook from "expo-facebook";
import React, { useEffect } from "react";
import { Button } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import {
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  View,
  Dimensions,
} from "react-native";
import { navigate } from "../components/navigationRef";

import { connect } from "react-redux";
import * as actions from "../actions";

const SC_WIDTH = Math.round(Dimensions.get("window").width);
const SC_HEIGHT = Math.round(Dimensions.get("window").height);

const authMenuScreen = (props) => {
  const loginWithFacebook = async () => {
    props.facebookLogin();
  };

  return (
    <View>
      <ImageBackground
        source={require("../../assets/background2.png")}
        style={styles.ImageBackground}
      >
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
        <Text style={styles.text}>Billions of bars.{"\n"} Free on Jabroni</Text>

        <View style={styles.buttonContainer}>
          <Button
            titleStyle={styles.buttonTitle}
            style={styles.buttonStyle}
            title="SIGN UP FREE"
            onPress={() => navigate("SignUpScreen")}
          />
          <Button
            titleStyle={styles.buttonTitle}
            style={styles.buttonStyle}
            title={"CONTINUE \n WITH FACEBOOK"}
            onPress={() => loginWithFacebook()}
            icon={
              <Feather
                name="facebook"
                size={24}
                color="white"
                style={{ left: 0 }}
              />
            }
          />
          <Button
            titleStyle={styles.buttonTitle}
            style={styles.buttonStyle}
            title="LOGIN"
            type="clear"
            onPress={() => navigate("LoginScreen")}
          />
        </View>
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
  logo: {
    width: 80,
    height: 80,
    marginTop: "40%",
  },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 15,
    left: 10,
    right: 10,
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
  },
  buttonStyle: {
    paddingTop: 10,
  },
});
function mapStateToProps({ authReducer }) {
  return { token: authReducer.token };
}

export default connect(mapStateToProps, actions)(authMenuScreen);

// const loginWithFacebook = async () => {
//   // log user into firebase and facebook
//   const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
//     "300020044475971",
//     {
//       permissions: ["public_profile"],
//     }
//   );

//   if (type == "success") {
//     const credential = firebase.auth.FacebookAuthProvider.credential(token);

//     firebase
//       .auth()
//       .signInWithCredential(credential)
//       .catch((error) => {
//         console.log(error);
//       });
//   }
// };
