import React from "react";
import {
  Text,
  StyleSheet,
  FlatLis,
  ImageBackground,
  Dimensions,
  Button
} from "react-native";
import { Feather } from "@expo/vector-icons";
const SC_WIDTH = Math.round(Dimensions.get("window").width);
const SC_HEIGHT = Math.round(Dimensions.get("window").height);
import { connect } from "react-redux";
import * as actions from "../actions/index";

// import Background from "../components/Background";

const SettingsScreen = (props) => {
  return (
    <ImageBackground
      source={require("../../assets/background2.png")}
      style={styles.ImageBackground}
    >
      <Button title="LogOut" onPress={()=> console.log(props.signout())}/>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  ImageBackground: {
    flex: 1,
    alignContent:'center',
    justifyContent: 'center'

  },
});

SettingsScreen.navigationOptions = {
  tabBarIcon: <Feather name="settings" size={24} color="white" />,
  tabBarOptions: {
    activeBackgroundColor: "black",
    inactiveBackgroundColor: "black",
  },
};

// export default SettingsScreen;

export default connect(null, actions)(SettingsScreen);
