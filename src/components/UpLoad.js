import React from 'react';
import { Modal, StyleSheet,ActivityIndicator, View, TextInput, Text, TouchableOpacity, Button, Linking, Alert, Image } from 'react-native';

import * as firebase from 'firebase';

import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Environment from '../Environment';

export default class UpLoad extends React.Component {
    state = {
        photo: null,
    }

    static navigationOptions = {
        title: 'Save Gift Idea'
    };

    async checkCameraRollPermission() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (status !== 'granted') {
            Alert.alert(
                'Hey',
                'Hey! You might want to enable notifications for my app, they are good.',
                [
                    { text: 'Settings', onPress: () => Linking.openURL('app-settings:') },
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    }
                ]
            )
            this.setState({
                hasCameraRollPermissions: false
            })
            return false
        }
        this.setState({
            hasCameraRollPermissions: true
        })
        return true
    }

    _pickImage = async () => {

        const checkPermissions = await this.checkCameraRollPermission()
        console.log(checkPermissions, '--what is returned here determins the permissions');
        if (!checkPermissions) return

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        
        console.log('result',result);

        if (!result.cancelled) {
            this.setState({ photo: result.uri })  // photo
            this.uploadImage(result.uri, "test-image");// name of picture being added
        }
    };


    uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        const ref = firebase.storage().ref().child("images/" + imageName);
        this.setState({ image: imageName });
        return ref.put(blob);

    }



    _maybeRenderImage = () => {
        let { image, googleResponse } = this.state;
        if (!image) {
            return;
        }

        return (
            <View
                style={{
                    marginTop: 20,
                    width: 250,
                    borderRadius: 3,
                    elevation: 2
                }}
            >
                <Button
                    style={{ marginBottom: 10 }}
                    onPress={() => this.submitToGoogle()}
                    title="Analyze!"
                />

                <View
                    style={{
                        borderTopRightRadius: 3,
                        borderTopLeftRadius: 3,
                        shadowColor: 'rgba(0,0,0,1)',
                        shadowOpacity: 0.2,
                        shadowOffset: { width: 4, height: 4 },
                        shadowRadius: 5,
                        overflow: 'hidden'
                    }}
                >
                    <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
                </View>
                <Text
                    onPress={this._copyToClipboard}
                    onLongPress={this._share}
                    style={{ paddingVertical: 10, paddingHorizontal: 10 }}
                />

                <Text>Raw JSON:</Text>

                {googleResponse && (
                    <Text
                        onPress={this._copyToClipboard}
                        onLongPress={this._share}
                        style={{ paddingVertical: 10, paddingHorizontal: 10 }}
                    >
                        JSON.stringify(googleResponse.responses)}
                    </Text>
                )}
            </View>
        );
    };



    submitToGoogle = async () => {
        try {
            this.setState({ uploading: true });
            let { image } = this.state;
            let body = JSON.stringify({
                requests: [
                    {
                        features: [
                            { type: 'LABEL_DETECTION', maxResults: 10 },
                            { type: 'LANDMARK_DETECTION', maxResults: 5 },
                            { type: 'FACE_DETECTION', maxResults: 5 },
                            { type: 'LOGO_DETECTION', maxResults: 5 },
                            { type: 'TEXT_DETECTION', maxResults: 5 },
                            { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
                            { type: 'SAFE_SEARCH_DETECTION', maxResults: 5 },
                            { type: 'IMAGE_PROPERTIES', maxResults: 5 },
                            { type: 'CROP_HINTS', maxResults: 5 },
                            { type: 'WEB_DETECTION', maxResults: 5 }
                        ],
                        image: {
                            source: {
                                imageUri: image
                            }
                        }
                    }
                ]
            });
            let response = await fetch(
                'https://vision.googleapis.com/v1/images:annotate?key=' +
                Environment['GOOGLE_CLOUD_VISION_API_KEY'],
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: body
                }
            );
            let responseJson = await response.json();
            console.log('responseJson',responseJson);
            this.setState({
                googleResponse: responseJson,
                uploading: false
            });
        } catch (error) {
            console.log('error',error);
        }
    };














	_maybeRenderUploadingOverlay = () => {
		if (this.state.uploading) {
			return (
				<View
					style={[
						StyleSheet.absoluteFill,
						{
							backgroundColor: 'rgba(0,0,0,0.4)',
							alignItems: 'center',
							justifyContent: 'center'
						}
					]}
				>
					<ActivityIndicator color="#fff" animating size="large" />
				</View>
			);
		}
	};














    render() {
        const { photo } = this.state;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {photo && (
                    <Image
                        source={{ uri: photo }}
                        style={{ width: 150, height: 150 }} />
                )}
                <Button title="Choose Photo" onPress={this._pickImage} />
                {this._maybeRenderImage()}
                {this._maybeRenderUploadingOverlay()}
            </View>
        );
    }

}
