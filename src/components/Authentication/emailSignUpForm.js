import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Input, Button } from 'react-native-elements';
import axios from 'axios';
// import firebase from 'firebase';

const ROOT_URL = 'https://us-central1-text-login-e96e9.cloudfunctions.net';

class emailSignUpForm extends Component {
  state = { phone: '' };

  /*
  handleSubmit = () => {

    axios.post(`${ROOT_URL}/createUser`, {
      phone: this.state.phone
    })
      .then(() => {
        axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: this.state.phone })
        
      })
  }
  */

  handleSubmit = async () => {
    try {
      await axios.post(`${ROOT_URL}/createUser`, { phone: this.state.phone })
      await axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: this.state.phone })
    } catch (err) {
      this.setState({ error: err })
      console.log(err);
    }
  }
  render() {
    return (
      <View>
        <View >
          <Text> Enter your phone number </Text>
          <TextInput
            value={this.state.phone.value}
            onChangeText={phone => this.setState({ phone })}
            placeholder={'Digit your number'}
            style={{ borderColor: 'rgb(18, 48, 92)', height: 40 }}
          />
        </View>
        <Button onPress={this.handleSubmit.bind(this)} title='Submit' />
      </View >
    );
  }
}


export default emailSignUpForm;