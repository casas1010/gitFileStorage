const admin = require('firebase-admin')

module.exports = function (req, res) {
    // Verify the user provided a phone
    if (!req.body.email) {
        return res.status(422).send({ error: 'Bad Input' });
    }

    // format the phone number to remove spaces/dashes, data cleaning
    const email = String(req.body.email).toLowerCase();

    // create a new user account using that phone number
    admin.auth().createUser({ uid: email })
        .then( (user) => res.send(user))
        .catch(err => res.status(422).send({ error: err }));

    // respond to the user request, saying the account was made




}





/*
NOTES!

node does not have access to es6, you cant use import

to export code, use the following code
module.exports = function() {..}


---
request    aka req
object that contains information about request

req.body
object that contaiins the data that was passed
to this function when the user called it


---

response   aka res
object that contains output data


admin.auth().createUser({ email })
makes the email the unique identify in the future

*/