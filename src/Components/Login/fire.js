import firebase from 'firebase';
import "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyBkPvVvhl7mukbnoIcBPCEbYsg0XiDxxLI",
  authDomain: "movie-app-49c28.firebaseapp.com",
  databaseURL: "https://movie-app-49c28.firebaseio.com",
  projectId: "movie-app-49c28",
  storageBucket: "movie-app-49c28.appspot.com",
  messagingSenderId: "960516316075",
  appId: "1:960516316075:web:17ba1125658915c6b410ee",
  measurementId: "G-0ERTRFVLHX"
  };

const fire = firebase.initializeApp(firebaseConfig);
export default fire;