import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDnFIraPQc3gjVFkB9jmNnLKnm2QxUA1-Y",
    authDomain: "favflix-7e2d6.firebaseapp.com",
    projectId: "favflix-7e2d6",
    storageBucket: "favflix-7e2d6.appspot.com",
    messagingSenderId: "185509477745",
    appId: "1:185509477745:web:4b7d44d8391c1c98b1cad0"
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;