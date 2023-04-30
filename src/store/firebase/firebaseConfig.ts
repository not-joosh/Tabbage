/*
*
*   Using FireStore Database, and User Authentication
*
*/

import { initializeApp } from "firebase/app";
import { getAuth, AuthCredential } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { collection } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAE7ZfPHsRH4X47Az3jEZxgj6ywousiy0A",
    authDomain: "tabbage-1a3ae.firebaseapp.com",
    projectId: "tabbage-1a3ae",
    storageBucket: "tabbage-1a3ae.appspot.com",
    messagingSenderId: "1001298803811",
    appId: "1:1001298803811:web:9bc07f908583f5d7374c56"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new AuthCredential();
export const db = getFirestore(app);

/*
*   Firestore Collections
*/

export const userAssetsRef = collection(db, 'userAssets'); // Secured User Information Handling UserAssets Collection
export const parcelRef = collection(db, 'parcels'); // Parcels Ref for Handling Parcel Collcetion