import { clientState } from "../../store/storeConfig";
import { UserHome, DriverHome, MerchantHome } from "../pageConfig";
import { useEffect, useState } from "react";
import { useLocalStorageListener } from "../../lib/helpers/LocalStorageListener";
import { useGetCurrentUser } from "../../hooks/userHooks/useUser";

export const MainHome = () => { 
    const { fetchUserInfo } = useGetCurrentUser();
    const [ accountType, setAccountType ] = useState("");

    const updateInfo = async () => {
        const accountType = await fetchUserInfo('accountType');
        clientState.isValidLocalChange = true;
        // @ts-ignore
        localStorage.setItem('accountType', accountType);
        clientState.isValidLocalChange = false;
    };

    useEffect(() => {
        const fetchedAccountType = localStorage.getItem('accountType');
        if (fetchedAccountType) {
            clientState.accountType = fetchedAccountType;
            setAccountType(fetchedAccountType);
        } else {
            updateInfo();
        }
    }, []);
    // Calling the useLocalStorageListener function to set up the listener
    useLocalStorageListener();
    return (
        <>
            {accountType !== "driver" && accountType !== "merchant" && (
                /* User Interface */
                <UserHome />
            )}
            {accountType === "driver" && (
                <DriverHome />
            )}
            {accountType === "merchant" && (
                <MerchantHome />
            )}
        </>
    );
};