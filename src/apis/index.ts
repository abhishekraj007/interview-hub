import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore/lite";
import { Question, User } from "../data-contracts/contracts";
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

export declare type QuestionResponse = {
  javascript: {
    id: string;
    data: Question[];
  };
  react: {
    id: string;
    data: Question[];
  };
};

// Get Questions
export const apiGetAllQuestions = async () => {
  const jsCol = collection(db, "questions");
  const jsSnapshot = await getDocs(jsCol);
  // console.log(jsSnapshot.docs);

  // @ts-ignore
  const jsList: QuestionResponse = jsSnapshot.docs.reduce((acc, doc) => {
    // console.log(doc.data());
    acc = {
      ...acc,
      [doc.id]: {
        id: doc.id,
        data: [...(doc.data().data ?? [])],
      },
    };

    return acc;
  }, {});

  return jsList;
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

// Update Questions
// basically javascript
export const apiUpdateQuestions = async (questionId: string, payload: any) => {
  const userRef = doc(db, "questions", questionId);
  // questionId -> javascript/react

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
