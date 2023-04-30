import { useEffect } from 'react';
import { useGetCurrentUser } from '../../hooks/userHooks/useUser';
import { useSnapshot } from 'valtio';
import { clientState } from '../../store/storeConfig';
import { auth } from '../../store/firebase/firebaseConfig';

export const useLocalStorageListener = () => {
    const snap = useSnapshot(clientState);
    const { fetchUserInfo } = useGetCurrentUser();
    const updateInfo = async () => {
        const accountType = await fetchUserInfo('accountType');
        console.log(accountType);
        clientState.isValidLocalChange = true;
        // @ts-ignore
        localStorage.setItem('accountType', accountType);
        clientState.isValidLocalChange = false;
    };

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if(event.key === 'accountType') {
                // The accountType value has changed, so update the userType state
                if(!snap.isValidLocalChange) { 
                    // Changing back the Updated Value to its original Type
                    updateInfo();
                }
            }
            if(event.key === 'isLoggedIn') {
                // The accountType value has changed, so update the userType state
                if(!snap.isValidLocalChange) { 
                    // Changing back the Updated Value to its original Type
                    if(auth.currentUser?.email)
                        localStorage.setItem('isLoggedIn', 'true');
                    else
                        localStorage.setItem('isLoggedIn', 'false');
                }
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);
};

export const validateLocalStorage = (validAccountType: string):boolean => {
    const currentUserType = localStorage.getItem('accountType');
    if(validAccountType === currentUserType) return true;
    else return false;
};