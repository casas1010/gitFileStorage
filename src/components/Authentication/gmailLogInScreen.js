import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Google from 'expo-google-app-auth'; //expo-google-sign-in
import firebase from 'firebase';
import { navigate } from '../navigationRef';

class gmailLogInScreen extends Component {


    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.getBasicProfile().getId()) {
                    // We don't need to reauth the Firebase connection.
                    return true;
                }
            }
        }
        return false;
    }

    onSignIn = (googleUser) => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!this.isUserEqual(googleUser, firebaseUser)) {
                // Build Firebase credential with the Google ID token.
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken
                );
                // Sign in with credential from the Google user.
                firebase
                    .auth()
                    .signInWithCredential(credential)
                    .then(function (result) {
                        console.log('user signed in');
                        if (result.additionalUserInfo.isNewUser) {
                            //create a user in the firebase database
                            firebase
                                .database()
                                .ref('/users/' + result.user.id)
                                .set({
                                    gmail: result.user.email,
                                    // profile_pifture: result.additionalUserInfo.profile.picture,
                                    // locale: result.additionalUserInfo.profile.locale,
                                    first_name: result.additionalUserInfo.profile.given_name,
                                    last_name: result.additionalUserInfo.profile.family_name,
                                    created_at: Date.now()
                                })
                                .then(function (snapshot) {
                                    //console.log()
                                });
                        } else {
                            firebase
                                .database()
                                .ref('/users/' + result.user.id)
                                .update({
                                    last_logged_in: Date.now()
                                })
                        }
                    })
                    .catch(function (error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // The email of the user's account used.
                        var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        var credential = error.credential;
                        // ...
                    });
            } else {
                console.log('User already signed-in Firebase.');
            }
        }.bind(this));
    };


    signInWithGoogleAsync = async () => {
        console.log('signInWithGoogleAsync initialized')
        try {
            const result = await Google.logInAsync({
                // androidClientId: YOUR_CLIENT_ID_HERE,
                behavior: 'web',
                iosClientId: '927776631562-1pgff9qlscsiei75e9vspejmnk4j5313.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });
            if (result.type === 'success') {
                this.onSignIn(result);
                console.log('login success'); // Remove me
                navigate('Scanner')
                return result.accessToken;
            } else {
                console.log('login failed');
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title='Sign In With Google' onPress={() => this.signInWithGoogleAsync()} />
                <StatusBar style="auto" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default gmailLogInScreen;
