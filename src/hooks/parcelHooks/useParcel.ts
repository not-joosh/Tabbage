/*
*   IMPORTS
*/
import * as yup from 'yup';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { parcelRef } from '../../store/firebase/firebaseConfig';
import { useToast } from '@chakra-ui/react';
import { saveParcelToDatabase, updateActiveParcels } from '../../store/firebase/firebaseFunctions';
import { createTimeStr } from '../../lib/helpers/DateHandler';
/*
*   GLOBAL AUTH INTERFACES
*/
export interface Cue {
    cueName: string;
    timeStamp: string;
};
export interface Parcel {
    address: string;
    information: string;
    location: string;
    recipient: string;
    visualCue: string;
    locationHistory: string[];
    informationHistory: string[];
    cueHistory: Cue[];
    timeDelivered: string;
    provider: string;
};

/*
*   GLOBAL VALIDATION SCHEMAS
*/

export const ParcelQuerySchema = yup.object().shape({
    trackingNumber: yup.string().required("Please enter Tracking Number"),
});

/*
*   Parcel Hooks
*/

export const useParcel = () => {
    
    const [isLoading, setLoading] = useState<boolean>(false);
    const [trackingNumber, setTrackingNumber] = useState('');
    const toast = useToast();

    const getParcel = async (trackingNumber: string, desiredInfo: string) => {
        try {
            setLoading(true);
            // packageRef Refers to the Collection where all the parcels are in.
            const parcelDocRef = doc(parcelRef, trackingNumber);
            const parcelDocSnap = await getDoc(parcelDocRef);
            
            if (!parcelDocSnap.exists()) {
                throw new Error(`Parcel with tracking number ${trackingNumber} does not exist.`);
            }
    
            const parcelData = parcelDocSnap.data();
            // Returning based on the desiredInfo...
            // We can Either Return the data, or we can return the specific document
            
            if(desiredInfo === 'document')
                return parcelDocSnap;
            else if(desiredInfo === 'docref')
                return parcelDocRef;
            else
                return parcelData;
        } catch(error: unknown) {
            setLoading(false);
            throw new Error(
                `Parcel could not be found. Invalid or expired tracking number.`
            );
        } finally {
            setLoading(false);
        }
    };

    const createParcel = async (address: string, recipient: string) => {
        try {
            setLoading(true);   
            const generatedTrackingID = await saveParcelToDatabase(address, recipient, true);
            await updateActiveParcels(generatedTrackingID as string, false, '');
            if (generatedTrackingID) {
                // Saving the newly generated tracking ID to the merchant's database collection
                setTrackingNumber(generatedTrackingID);
                // Copying the tracking ID to clipbard
                navigator.clipboard.writeText(generatedTrackingID);
                toast({
                    title: 'Tracking number successfully created! Copied to clipboard.',
                    status: 'success',
                    isClosable: true,
                    position: 'top',
                    duration: 3000,
                });
            } else {
                throw new Error(`Tracking number could not be created.`);
            }
        } catch(error: unknown) {
            if(error instanceof Error)
                toast({
                    title: 'Creation of Parcel Failed!',
                    status: 'error',
                    isClosable: true,
                    position: 'top',
                    description: error.message,
                    duration: 3000,
                });
        } finally {
            setLoading(false);
        };
    };

    const updateParcel = async (parcelIDin: string, newCue: string, newInfo: string, newLocation: string) => {
        try {
            console.log('THIS HAS BEEN TRIGGERED');
            setLoading(true);   
            // First find the parcel. if it is not found then we will throw an error
            const parcelID = parcelIDin.trim();
            const parcelDocRef = doc(parcelRef, parcelID);
            const parcelDocSnap = await getDoc(parcelDocRef);
            // Need to get the timestamp of the update...
            const timeUpdatedStr = createTimeStr();
            // If it is found then lets update the parcel now.
            if(parcelDocSnap.exists()) {
                const parcelData = parcelDocSnap.data() as Parcel;
                const updatedCueHistory = [{cueName: newCue, timeStamp: timeUpdatedStr}, ...parcelData.cueHistory];
                const updatedInformationHistory = [newInfo, ...parcelData.informationHistory];
                const updatedLocationHistory = [newLocation, ...parcelData.locationHistory];
                await updateDoc(parcelDocRef, { 
                    cueHistory: updatedCueHistory,
                    informationHistory: updatedInformationHistory,
                    locationHistory: updatedLocationHistory,
                    location: newLocation,
                    visualCue: newCue,
                    information: newInfo + ` Recipient: ${parcelData.recipient}`,
                    timeDelivered: newCue === 'delivered'? timeUpdatedStr : '',
                });
                if(newCue === 'delivered') {
                    // parcelData.provider
                    // Logic Saerch for the bitch
                    // Go through the bitches activeparcels to find the parcel
                    // remove from the active parcels, and add to the past parcels
                    await updateActiveParcels(parcelID, true, parcelData.provider);
                }
                toast({
                    title: 'Parcel Successfully Updated!',
                    status: 'success',
                    isClosable: true,
                    position: 'top',
                    duration: 3000,
                });
            } else {
                throw new Error(`Parcel could not be found.`);
            }
        } catch(error: unknown) {
            if(error instanceof Error)
                toast({
                    title: 'Update of Parcel Failed!',
                    status: 'error',
                    isClosable: true,
                    position: 'top',
                    description: error.message,
                    duration: 3000,
                });
            setLoading(false);
            return false;
        } finally {
            setLoading(false);
        };
        return true;
    };
    return { getParcel, isLoading, createParcel, trackingNumber, updateParcel};
};