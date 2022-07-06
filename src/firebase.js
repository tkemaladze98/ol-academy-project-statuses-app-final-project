import firebase from "firebase/app";
import "firebase/database";

let config = {
    apiKey: "AIzaSyDBUXZuGXhIm4OpSm7TfteE7l32_lHXX6o",
    authDomain: "ola-final-project.firebaseapp.com",
    databaseURL: "https://ola-final-project-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ola-final-project",
    storageBucket: "ola-final-project.appspot.com",
    messagingSenderId: "479848898015",
    appId: "1:479848898015:web:4ff3264dc76306ed49f86a"
};

firebase.initializeApp(config);

export default firebase.database();