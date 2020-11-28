import firebase from "firebase";

//api details

///change this config
///change this config
const config = {
  apiKey: "AIzaSyCCCh3G4iT8ATIO58ialolr4LTWm6wWp5Y",
  authDomain: "digi-club.firebaseapp.com",
  databaseURL: "https://digi-club.firebaseio.com",
  projectId: "digi-club",
  storageBucket: "digi-club.appspot.com",
  messagingSenderId: "269545774676",
  appId: "1:269545774676:web:3668e05f9a2c84b57957c1",
  measurementId: "G-XZ0091GE0S",
};
// const config = {
//   apiKey: "asdlasaskjaskjkasjckajscjaskljdasd",
//   authDomain: "dasd.das.firebaseapp.com",
//   databaseURL: "https://dasdadasdad.firebaseio.com",
//   projectId: "safasfsa",
//   storageBucket: "dsadasdasd.appspot.com",
//   messagingSenderId: "264295232442476",
//   appId: "1:2632432444:web:3668e05f9fsdfsdf34",
//   measurementId: "G-JK79J",
// };

firebase.initializeApp(config);

export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
