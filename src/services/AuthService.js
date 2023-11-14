import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import { app } from '@/config/firebase'

const auth = getAuth(app)

export const waitForUser = () =>
  onAuthStateChanged(auth, userCredential => {
    localStorage.setItem('user', JSON.stringify(userCredential))
  })

export const getUserSessionService = callback =>
  onAuthStateChanged(auth, userCredential => callback(userCredential))

export const loginWithGoogleService = () =>
  signInWithPopup(auth, new GoogleAuthProvider())
    .then(userCredential => {
      return {
        user: userCredential.user
      }
    })
    .catch(error => {
      return {
        error: error.message
      }
    })

export const createUserService = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      return {
        user: userCredential.user
      }
    })
    .catch(error => {
      return {
        error: error.message
      }
    })

export const logInWithEmailService = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      return {
        user: userCredential.user
      }
    })
    .catch(error => {
      return {
        error: error.message
      }
    })

export const logInWithFacebookService = () =>
  signInWithPopup(auth, new FacebookAuthProvider())
    .then(userCredential => {
      return {
        user: userCredential.user
      }
    })
    .catch(error => {
      return {
        error: error.message
      }
    })

export const logoutService = async () => {
  await signOut(auth)
}
