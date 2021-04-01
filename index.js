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


exports.createNotif = functions.database.ref('/notifications/{id}/items/{stats}')
  .onCreate(async (snapshot, context) => {
  	console.log('Notif Created', snapshot.data());
  
    const userId = context.params.id;

  	const userRef = admin.firestore().doc(`tokens/${userId}`);
  	const doc = await userRef.get();

  	const notifToken = doc.data().token;
  	if(notifToken){
  		//send notif
  		sendMsg(stats.username, stats.summary, stats.thumbnail, notifToken);
  	} else {
  		console.log("No token for this user.")
  	}
   });



var registrationToken = 'dPSQWSsco0PpsjAF5_phq1:APA91bHL2nhhjYnhkRtNZNNqlg3gh4VKXIRTVA2beNwzsPvCBbO1n6Z6ouhR44RhlkC-13VO4vRn2FUG374BIvUkkwgfBsnDiVz4UxVE8_wYCPRa3Csn9SMyLJ9LMH4wyS__IxzbBVkO';

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

//sendMsg("Abdul", "liked your post!", "https://firebasestorage.googleapis.com/v0/b/greenwoodproject.appspot.com/o/avatars%2F2021-03-05%2012%3A18%3A44.583311%2FAbdul%20Muhammad?alt=media&token=69ae469a-97aa-4b99-bb5e-66a59a722981", registrationToken);

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
