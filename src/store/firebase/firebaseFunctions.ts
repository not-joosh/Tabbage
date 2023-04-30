import { fetchSignInMethodsForEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth, parcelRef, userAssetsRef } from "./firebaseConfig";
import { createTimeStr } from "../../lib/helpers/DateHandler";
import { doc, documentId, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { Parcel, SignUpFormData } from "../../hooks/hooksConfig";
import { MerchantData } from "../../hooks/userHooks/useUser";

export const saveUserToDatabase = async (userData: SignUpFormData) => {
    try {
        // Create user account with email and password
        await signInWithEmailAndPassword(auth, userData.email, userData.password);
        // Get current date and time
        const timeCreatedStr = createTimeStr();
        // Save user details to the userAssets collection and match the uid with docid
        const newAccountDoc = doc(userAssetsRef, auth.currentUser?.uid);
        if(userData.accountType === 'merchant') {
            await setDoc(newAccountDoc, {
                username: userData.userName,
                email: userData.email,
                accountType: userData.accountType,
                fullname: userData.fullName,
                activeParcels: [],
                pastParcels: [],
                timeCreatedStr: timeCreatedStr,
            });
        } else {
            await setDoc(newAccountDoc, {
                username: userData.userName,
                email: userData.email,
                accountType: userData.accountType,
                fullname: userData.fullName,
                timeCreatedStr: timeCreatedStr,
            });
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err);
            throw new Error('Failed to create user account or save user details.');
        }
    };
};
export const isAvailableEmail = async (email: string): Promise<boolean> => {
    let isAvailable = false;
    const tryQuery = async (email: string): Promise<boolean> => {
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        if (signInMethods.length > 0) {
            return false;
        } else {
            return true;
        }
    };
    isAvailable = await tryQuery(email);
    return isAvailable;
};

export const isAvailableUsername = async (userName: string): Promise<boolean> => {
    let isAvailable = false;
    const tryQuery = async (userName: string): Promise<boolean> => {
        const querySnapshot = await getDocs(query(userAssetsRef, where("username", "==", userName)));
        if (!querySnapshot.empty) {
            return false;
        } else {
            return true;
        }
    };
    isAvailable = await tryQuery(userName);
    return isAvailable;
};

export const saveParcelToDatabase = async (address: string, recipient: string, isReturningID: boolean) => {
    try {
        // Save user details to the userAssets collection and match the uid with docid
        const newParcel = doc(parcelRef);
        const timeCreatedStr = createTimeStr();
        await setDoc(newParcel, {
            timeDelivered: '',
            information: 'Preparing to Ship',
            location: '',
            address: address,
            recipient: recipient,
            visualCue: 'preparing',
            locationHistory: [' ', ' '],
            informationHistory: ['Preparing to Ship', 'Order Placed'],
            cueHistory: [
                {cueName: 'preparing', timeStamp: timeCreatedStr},
                {cueName: 'orderPlaced', timeStamp: timeCreatedStr}
            ],
            provider: auth.currentUser?.uid,
        });
        if(isReturningID)
            return newParcel.id;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err);
            throw new Error('Failed to create and save parcel to the database.');
        }
    };
};

export const updateActiveParcels = async (trackingNumber: string, isRemoving: boolean, provider: string) => {
    try {
        const merchantDocRef = doc(userAssetsRef, isRemoving? provider : auth.currentUser?.uid);
        const merchantDoc = await getDoc(merchantDocRef);
        if(!isRemoving) { // Adding the Parcel to the Merchant's Active Parcels
            if (merchantDoc.exists()) {
                const merchantData = merchantDoc.data() as MerchantData;
                const updatedActiveParcels = [trackingNumber, ...merchantData.activeParcels];
                await updateDoc(merchantDocRef, { activeParcels: updatedActiveParcels });
            }
        } else { // Moving particular parcel inside 'active parcels' to 'remove parcels'
            if (merchantDoc.exists()) {
                const merchantData = merchantDoc.data() as MerchantData;
                const updatedActiveParcels = merchantData.activeParcels.filter((parcelNumber) => parcelNumber !== trackingNumber);
                const updatedPastParcels = [trackingNumber, ...merchantData.pastParcels];
                await updateDoc(merchantDocRef, { 
                    pastParcels: updatedPastParcels,
                    activeParcels: updatedActiveParcels,
                });
            }
        }
    } catch(error: unknown) {
        console.error(error);
        throw new Error('Failed to create and save parcel to the database.')
    }
};