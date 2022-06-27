import {
  addDoc,
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore/lite";
import { User } from "../data-contracts/contracts";
import { db, signInWithGoogle } from "../firebase-config";

export const URLS = {
  js: "https://raw.githubusercontent.com/abhishekraj007/md2json/main/api/js-v1.json",
  react:
    "https://raw.githubusercontent.com/abhishekraj007/md2json/main/api/react-v1.json",
};

export const apiGetQuestions = async (url: string = URLS.js) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const apiLogInWithGoogle = async () => {
  try {
    const result = await signInWithGoogle();
    return result;
  } catch (error) {
    throw new Error(error as string);
  }
};

// Get a list of cities from your database
export const apiGetJavascriptQuestions = async () => {
  const jsCol = collection(db, "javascript");
  const jsSnapshot = await getDocs(jsCol);
  const jsList = jsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return jsList;
};

// Add a question
export const apiAddJavascriptQuestion = async (payload) => {
  const jsCol = collection(db, "javascript");
  const response = await addDoc(jsCol, payload);
  console.log(response);
};

// Add a question
export const apiAddReactQuestion = async (payload) => {
  const jsCol = collection(db, "javascript");
  const response = await addDoc(jsCol, payload);
  return response;
};

// Add user
export const apiAddUser = async (payload: User) => {
  const user = doc(db, "users", payload.id);
  try {
    const response = await setDoc(user, payload);
    return response;
  } catch (error) {
    throw new Error(error as string);
  }
};

// Update User
export const apiUpdateUser = async (userId: string, payload: any) => {
  const userRef = doc(db, "users", userId);

  try {
    const response = await updateDoc(userRef, payload);
    return response;
  } catch (error) {
    throw new Error(error as string);
  }
};

// Update User
export const apiUpdateQuestions = async (questionId: string, payload: any) => {
  const userRef = doc(db, "questions", questionId);

  try {
    const response = await updateDoc(userRef, payload);
    return response;
  } catch (error) {
    throw new Error(error as string);
  }
};

// Get user data
export const apiGetUserData = async (userId) => {
  try {
    // Get This user from databse
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    return userSnap;
  } catch (error) {
    throw new Error(error as string);
  }
};
