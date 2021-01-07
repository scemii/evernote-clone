import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSWpli2Cd3m5CR_UgSjK4IVOz4PIXl0YU",
  authDomain: "reac-quill.firebaseapp.com",
  projectId: "reac-quill",
  storageBucket: "reac-quill.appspot.com",
  messagingSenderId: "1052282312749",
  appId: "1:1052282312749:web:1704d945b42149acfe80a4",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
