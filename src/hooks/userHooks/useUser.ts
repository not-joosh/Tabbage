/*
*   IMPORTS
*/
import { auth } from "../../store/firebase/firebaseConfig";
import { userAssetsRef } from "../../store/firebase/firebaseConfig";
import { getDocs } from "firebase/firestore";

export interface UserData {
    id: string;
    accountType: string;
    email: string;
    username: string;
    password: string;
    fullname: string;
    timeCreated: string;
};

export interface MerchantData {
    username: string;
    email: string;
    accountType: string;
    fullname: string;
    activeParcels: string[];
    pastParcels: string[];
    timeCreatedStr: string;
};

export interface AdminData {
    email: string;
    accountType: string;
    fullname: string;
    pendingDriver: string[];
};

export interface Applicant {
    fullname: string;
    email: string;
    timeCreatedStr: string;
};

export const useGetCurrentUser = () => {
    const fetchUserInfo = async (dataType: string) => {
        try {
            if (!auth.currentUser) return '';
            const querySnapshot = await getDocs(userAssetsRef);
            const filteredData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            const userData = filteredData.find((data) => data.id === auth.currentUser?.uid) as unknown as MerchantData;
            switch(dataType) {
                case 'accountType':
                    return userData.accountType;
                case 'email':
                    return userData.email;
                case 'username':
                    return userData.username;
                case 'fullname':
                    return userData.fullname;
                case 'timeCreated':
                    return userData.timeCreatedStr;
                case 'activeParcels':
                    return userData.activeParcels;
                case 'pastParcels':
                    return userData.pastParcels;
                default:
                    return null;
            }
        } catch (err: unknown) {
            console.error(err);
            if(err instanceof Error)
                throw new Error(err.message)
        };
    };

    return { fetchUserInfo }
};