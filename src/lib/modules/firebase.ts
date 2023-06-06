// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCtrTlt9Alv-3FpJLxj5Dv_u2JO9gJLHvM',
	authDomain: 'whitemarket-915d3.firebaseapp.com',
	projectId: 'whitemarket-915d3',
	storageBucket: 'whitemarket-915d3.appspot.com',
	messagingSenderId: '600320841722',
	appId: '1:600320841722:web:4c7ba669a433537934f643',
	measurementId: 'G-FLFES1PX1Z'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null));

export { app, analytics, auth, db };
