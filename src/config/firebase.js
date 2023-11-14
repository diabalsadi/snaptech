// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBacjneM_TduGcLlnfVINx-_3YGmWSAGGY',
  authDomain: 'expanded-idiom-393713.firebaseapp.com',
  projectId: 'expanded-idiom-393713',
  storageBucket: 'expanded-idiom-393713.appspot.com',
  messagingSenderId: '153698148589',
  appId: '1:153698148589:web:437d44d44b5c6c081fece4',
  measurementId: 'G-1NHG0115QZ'
}


// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
