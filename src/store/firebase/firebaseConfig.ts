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
    /*SECRET ;) Lub You Cutie*/
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
