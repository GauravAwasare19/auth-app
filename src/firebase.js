import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword, signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword, signOut as firebaseSignOut, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCCBJT7UyC_8v-Y48y5vs7J3JKWD6K44qI",
  authDomain: "test-app1-1ad3f.firebaseapp.com",
  projectId: "test-app1-1ad3f",
  storageBucket: "test-app1-1ad3f.appspot.com",
  messagingSenderId: "224152175817",
  appId: "1:224152175817:web:7d19bfb11e2b3fc5893918",
  measurementId: "G-2Q91RDQX40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export Firebase services if needed
export { auth, db };

// Export any additional functions you need
export const createUserWithEmailAndPassword = (email, password) =>
  firebaseCreateUserWithEmailAndPassword(auth, email, password);

export const signInWithEmailAndPassword = (email, password) =>
  firebaseSignInWithEmailAndPassword(auth, email, password);

export const signOut = () =>
  firebaseSignOut(auth);

export const resetPassword = (email) =>
  sendPasswordResetEmail(auth, email);

export const createUserDocument = async (uid, userData) => {
  const userRef = doc(db, 'users', uid);

  try {
    await setDoc(userRef, userData);
    console.log("User document created successfully!");
  } catch (error) {
    console.error("Error creating user document:", error);
  }
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;

  try {
    const userDocument = await getDoc(doc(db, 'users', uid));
    return { uid, ...userDocument.data() };
  } catch (error) {
    console.error("Error fetching user document:", error);
  }
};
