// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDNoYLhqhUl86iTyv-SE8E30oJawIBhFeA',
  authDomain: 'react-job-platform.firebaseapp.com',
  projectId: 'react-job-platform',
  storageBucket: 'react-job-platform.appspot.com',
  messagingSenderId: '602664020666',
  appId: '1:602664020666:web:9809bccff723302c603083',
  measurementId: 'G-YPYEVDNSMR',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const fireDB = getFirestore(app);
