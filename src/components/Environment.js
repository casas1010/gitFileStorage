
var environments = {
	staging: {
		FIREBASE_API_KEY: 'AIzaSyCfCvaFKluzWP5IQ_E9cOc-qu7X7UNHniE',
		FIREBASE_AUTH_DOMAIN: 'vision-c1328.firebaseapp.com',
		FIREBASE_DATABASE_URL: 'https://vision-c1328.firebaseio.com',
		FIREBASE_PROJECT_ID: 'vision-c1328',
		FIREBASE_STORAGE_BUCKET: 'vision-c1328.appspot.com',
		FIREBASE_MESSAGING_SENDER_ID: '34889931618',
		GOOGLE_CLOUD_VISION_API_KEY: 'AIzaSyBuy2qUE9f_5iKPe5-D91Mdkjk-SlMOr1k'
		
	},
	production: {
		// Warning: This file still gets included in your native binary and is not a secure way to store secrets if you build for the app stores. Details: https://github.com/expo/expo/issues/83
	}
};

function getReleaseChannel() {
	let releaseChannel = Expo.Constants.manifest.releaseChannel;
	if (releaseChannel === undefined) {
		return 'staging';
	} else if (releaseChannel === 'staging') {
		return 'staging';
	} else {
		return 'staging';
	}
}
function getEnvironment(env) {
	console.log('Release Channel: ', getReleaseChannel());
	return environments[env];
}
var Environment = getEnvironment(getReleaseChannel());
export default Environment;
