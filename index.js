const admin = require("firebase-admin");
const functions = require('firebase-functions');

//testing

admin.initializeApp({
  databaseURL: "https://greenwoodproject.firebaseio.com",
  credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })
});

const db = admin.firestore();

exports.createNotif = functions.firestore
  .document('notifications/{id}/{item}')
  .onCreate(async (snapshot, context) => {
  	console.log('Notif Created', snapshot.data());

  	const userRef = admin.firestore().doc(`tokens/${item.ownerID}`);
  	const doc = await userRef.get();

  	const notifToken = doc.data().token;
  	if(notifToken){
  		//send notif
  		sendMsg(item.username, item.summary, item.thumbnail, notifToken);
  	} else {
  		console.log("No token for this user.")
  	}
   });



//var registrationToken = 'dPSQWSsco0PpsjAF5_phq1:APA91bHL2nhhjYnhkRtNZNNqlg3gh4VKXIRTVA2beNwzsPvCBbO1n6Z6ouhR44RhlkC-13VO4vRn2FUG374BIvUkkwgfBsnDiVz4UxVE8_wYCPRa3Csn9SMyLJ9LMH4wyS__IxzbBVkO';

async function sendMsg(msgTitle, msgBody, msgImg, tok){
await admin.messaging().sendMulticast({
  tokens: [tok],
  notification: {
    title: "Greenwood Project",
    body: msgTitle + " " + msgBody,
    imageUrl: msgImg,
  },
}).then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
}

//sendMsg();

//we are sending another

// // Send a message to the device corresponding to the provided
// // registration token.
// admin.messaging().send(message)
//   .then((response) => {
//     // Response is a message ID string.
//     console.log('Successfully sent message:', response);
//   })
//   .catch((error) => {
//     console.log('Error sending message:', error);
//   });


// //Should send message to iphone
