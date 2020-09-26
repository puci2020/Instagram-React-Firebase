import firebase from 'firebase'

const firebaseConfig = firebase.initializeApp( {
    apiKey: "AIzaSyAzwWt_bY9bjDw6RywollbY3GTSyutdRcU",
    authDomain: "instagram-47603.firebaseapp.com",
    databaseURL: "https://instagram-47603.firebaseio.com",
    projectId: "instagram-47603",
    storageBucket: "instagram-47603.appspot.com",
    messagingSenderId: "506323584248",
    appId: "1:506323584248:web:c4f08df8ff7e9be2a9e70d",
    measurementId: "G-5B0Q6Y1FLH"
});

const db = firebaseConfig.firestore();
const auth = firebaseConfig.auth();
const storage = firebaseConfig.storage();

export {db, auth, storage};
