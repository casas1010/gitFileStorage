import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';


import Scan from "../components/Scan";

// NOTE: I am not sure how to test if I reformated this component correctly
// I am also not sure why there is a 'error' in line 12 and 15

const ScannerScreen = (props) => {
  const [isFocused, setIsFocused] = useState(true);

  useEffect(() => {
    const focusListner = props.navigation.addListener("didFocus", () =>
      setIsFocused(true)
    );
    const blurListner = props.navigation.addListener("willBlur", () =>
      setIsFocused(false)
    );
    return () => {
      focusListner.remove();
      blurListner.remove();
    };
  });

  if (!isFocused) {
    return (
      <View contentContainerStyle={styles.container} style={styles.spinner}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return <Scan navigation={props.navigation} />;
};

ScannerScreen.navigationOptions = {
  tabBarIcon: <MaterialCommunityIcons name="barcode-scan" size={24} color="white" />,
  tabBarOptions:{
    activeBackgroundColor: 'black',
    inactiveBackgroundColor: 'black'
  }
}

const styles = {
  container: {
    flexGrow: 1,
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};

export default ScannerScreen;

/*

import React from 'react';
import {
  ActivityIndicator,
  View,
} from 'react-native'
import Scan from '../components/Scan';

class ScannerScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      isFocused: false
    };
  }

  componentDidMount() {
    this.focusListner = this.props.navigation.addListener(
      'didFocus',
      () => this.setState({ isFocused: true }),
    );
    this.blurListner = this.props.navigation.addListener(
      'willBlur',
      () => this.setState({ isFocused: false }),
    );
  }
  componentWillUnmount() {
    this.focusListner.remove();
    this.blurListner.remove();
  }

  render() {
    if (!this.state.isFocused) {
      return (
        <View contentContainerStyle={styles.container} style={styles.spinner}>
          <ActivityIndicator size='large' />
        </View>
      );
    }
    return (<Scan navigation={this.props.navigation} />);
  }
}

const styles = {
  container: {
    flexGrow: 1
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};
        
export default ScannerScreen;

*/
