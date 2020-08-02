import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import * as firebase from "firebase"; // yarn add firebase@^5.7.3
import { firebaseConfig } from "./config.js";

import { Provider } from "react-redux";
import store from "./src/store";

import AuthScreen from "./src/Screens/AuthScreen";
import LoginScreen from "./src/Screens/LogInScreen";
import SignUpScreen from "./src/Screens/SignUpScreen";
import ScannerScreen from "./src/Screens/ScannerScreen";
import ListScreen from "./src/Screens/ListScreen";
import SettingsScreen from "./src/Screens/SettingsScreen";
import authMenuScreen from "./src/Screens/authMenuScreen";

import { setNavigator } from "./src/components/navigationRef";

firebase.initializeApp(firebaseConfig);

const AuthenticationFlow = createSwitchNavigator({
  AuthScreen,
  logInFlow: createSwitchNavigator({
    authMenuScreen,
    LoginScreen,
    SignUpScreen,
  },
  // {navigationOptions:{lazy:true}}
  )
  ,
  mainFlow: createBottomTabNavigator(
    {
      Scan: ScannerScreen,
      ListScreen,
      SettingsScreen,
    }
  ),
});

const AppNavigator = createAppContainer(AuthenticationFlow);

export default () => {
  return (
    <Provider store={store}>
      <AppNavigator
        ref={(navigator) => {
          setNavigator(navigator);
        }}
      />
    </Provider>
  );
};
