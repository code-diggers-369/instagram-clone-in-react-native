import firebase from 'firebase';

//api details
///change this config
const config = {
    apiKey: "asdlasaskjaskjkasjckajscjaskljdasd",
    authDomain: "dasd.das.firebaseapp.com",
    databaseURL: "https://dasdadasdad.firebaseio.com",
    projectId: "safasfsa",
    storageBucket: "dsadasdasd.appspot.com",
    messagingSenderId: "264295232442476",
    appId: "1:2632432444:web:3668e05f9fsdfsdf34",
    measurementId: "G-JK79J"
  };

    firebase.initializeApp(config);

    export const f = firebase;
    export const database = firebase.database();
    export const auth = firebase.auth();
    export const storage = firebase.storage();