import { initializeApp } from 'firebase';
import firebase from 'firebase';

const firebaseConfig  = {
    apiKey: 'AIzaSyA9AcpnAf1U0lwCg4uf8l-zOgdRweF_p5A',
    authDomain: 'customermanager-1a56e.firebaseapp.com',
    databaseURL: 'https://customermanager-1a56e.firebaseio.com',
    projectId: 'customermanager-1a56e',
    storageBucket: 'customermanager-1a56e.appspot.com',
    messagingSenderId: '51380860888',
    appId: "1:51380860888:web:7f88c560071c8def37a4ad"
};



export default firebase.initializeApp(firebaseConfig);
// export const db = firebase.firestore();
// export const dbRef = db.collection("customers");
// export const db = app.database();
// export const dbRef = db.ref('customers/')
