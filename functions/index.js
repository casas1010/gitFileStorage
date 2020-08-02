const admin = require('firebase-admin');
const functions = require('firebase-functions');
const createUser = require('./create_user');
const serviceAccount = require('./service_account.json');
const barcodeLookUp = require('./barcodeLookUp');



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://quickstart-1585764879031.firebaseio.com"
});


exports.createUser = functions.https.onRequest(createUser);

exports.barcodeLookUp = functions.https.onRequest(barcodeLookUp);



/*
NOTES

firebase deploy --project quickstart-1585764879031
command used to updat

---

const serviceAccount = require('./service_account.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://quickstart-1585764879031.firebaseio.com"
});
contains credentials and method to access the database

---


exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});
format of function


exports
object used to set up a google cloud function

functions.https.onRequest
this is how we set up a google cloud function

response.send
function executed when we went to the URL

exports.createUser = functions.https.onRequest(createUser);
Any time an an HTTP request comes in.
Run the function createUser by assigning the result of this to exports.createUser we are telling
firebase that there is going to be a new Google Cloud function that it can run called specifically create


request
object that contains information about request

response
object that contains output data
*/