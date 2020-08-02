import React, { Component, useState } from "react";
import { View, Text, TextInput, SafeAreaView,StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import axios from "axios";
import firebase from "firebase";
import AuthForm from '../../context/AuthForm';

const ROOT_URL = "https://us-central1-text-login-e96e9.cloudfunctions.net"; // CHANGE ME

const EmailSignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null)

  const handleSubmit = async () => {
    try {
      //await axios.post(`${ROOT_URL}/verifyOneTimePassword`, { phone: this.state.phone, code: this.state.code })
    } catch (err) {
      setError(err)
    }
  };

  return (
    <SafeAreaView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input:{
    backgroundColor:'#2089dc',


  },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default EmailSignInForm;
