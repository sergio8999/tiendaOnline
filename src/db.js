import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

import { firebaseConfig } from "./firebaseConfig.js";

// Get a Firestore instance
export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore()
export const storage =firebase.storage(); 

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true })

export default {
  auth: firebase.auth(),
  login(parametro) {
    var provider;
    if(parametro =="google")
      provider = new firebase.auth.GoogleAuthProvider();
    else if(parametro=="github")
      provider = new firebase.auth.GithubAuthProvider();
    else if(parametro=="twiiter")
       provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(function() {
      console.log(firebase.auth().currentUser.email);
    })
    .catch(function(error){
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
      console.log(errorCode, errorMessage, email, credential);
      })
  },
  logout() {
    firebase.auth().signOut()
    .then(function() {})
    .catch(function(error) {
      console.log(error)});
  },
  crearUsuario(email,password){
   firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((user) => {
    console.log(user);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
  },
  comprobarUsuario(email,password){
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    console.log(user);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
  }
}

