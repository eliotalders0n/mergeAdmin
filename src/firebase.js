import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth"

// Import the functions you need from the SDKs you need
 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo4GmjDiVIdOItrjazj4PaGmNpQ-_cApU",
  authDomain: "merge-bd5de.firebaseapp.com",
  projectId: "merge-bd5de",
  storageBucket: "merge-bd5de.appspot.com",
  messagingSenderId: "740369496649",
  appId: "1:740369496649:web:c8a86006442583a3965d98",
  measurementId: "G-T63DMHJMX8"
};

firebase.initializeApp(firebaseConfig);
export default firebase;