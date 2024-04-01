// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfOpsiK7-I3codWUt6QAlG_LCzAc8xl7I",
  authDomain: "userregistration-d3d19.firebaseapp.com",
  databaseURL: "https://userregistration-d3d19-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "userregistration-d3d19",
  storageBucket: "userregistration-d3d19.appspot.com",
  messagingSenderId: "831873256646",
  appId: "1:831873256646:web:bf75e41c92afb9cce55bc7"
};
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app; 
