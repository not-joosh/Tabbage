import { AnimatePresence, motion } from "framer-motion";
import { CustomButton, CustomDecorations, ErrorModal, LoadingIcon, QueryForm, QueryFormData } from "./componentConfig";
import { useEffect, useRef, useState } from "react";
import { useLocalStorageListener } from "../lib/helpers/LocalStorageListener";
import { useNavigate } from "react-router";
import { useToast } from "@chakra-ui/react";
import { auth } from "../store/firebase/firebaseConfig";
import { HOME, LOGIN } from "../lib/routes";
import { useLogout } from "../hooks/auth/useAuth";
import { ParcelHistory } from "./ParcelHistory";
import { ParcelQuerySchema, useParcel } from "../hooks/hooksConfig";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { clientState } from "../store/storeConfig";
import { Parcel as ParcelType } from "../hooks/hooksConfig";
import '../stylesheets/ParcelHistory.css';
import { fadeAnimation } from "../lib/helpers/Motion";
import { 
    ParcelHistoryBG, returnBtn, whiteCircle, pinkSquare, whiteSquare,
} from "../assets/assetsConfig";

export const Parcel = () => {
    
    const navigate = useNavigate();
    const [loginBtnState, setLoginBtnState] = useState<string>('');
    const {getParcel, isLoading} = useParcel();
    const { logout } = useLogout();
    const [parcelSnapshot, setParcelSnapShot] = useState<ParcelType | undefined | null>(null);
    const toast = useToast();
    
    const {register, handleSubmit, formState: {errors}, reset } = useForm <QueryFormData> ({
        resolver: yupResolver(ParcelQuerySchema),
    });

    const handleQuery = async (requestQuery: QueryFormData) => {
        try {
            const trackingNumber = requestQuery.trackingNumber.trim();
            const parcelSnapshot = await getParcel(trackingNumber, 'data') as ParcelType;
            clientState.parcelIsFound = true;
            clientState.parcelID = trackingNumber;
            setParcelSnapShot(parcelSnapshot as ParcelType);
        } catch(err: unknown) {
            if(err instanceof Error) {
                toast({
                    title: 'Something went wrong...',
                    status: 'error',
                    isClosable: true,
                    position: 'top',
                    description: err.message,
                    duration: 3000,
                });
                reset();
                clientState.parcelID = '';
                setParcelSnapShot(null);
            }
        }
    };

    const handleAction = async () => {
        if(auth.currentUser?.email) { /*IF THE USER IS LOGGED IN, THEN LOG THEM OUT*/
            clientState.parcelIsFound = false;
            clientState.parcelID = '';
            await logout();
        } else { // If the User is Loggedout
            clientState.parcelIsFound = false;
            clientState.parcelID = '';
            navigate(LOGIN);
        }
    };

    const handleParcelInformation = async () => {
        try {
            const parcelSnapshot = await getParcel(clientState.parcelID, 'data') as ParcelType;
            setParcelSnapShot(parcelSnapshot as ParcelType);
        } catch(error: unknown) {
            if(error instanceof Error) {
                toast({
                    title: 'Something went wrong...',
                    status: 'error',
                    isClosable: true,
                    position: 'top',
                    description: error.message,
                    duration: 3000,
                });
            }
        }
    };

    useEffect(() => {
        localStorage.getItem('isLoggedIn')? setLoginBtnState("Logout") : setLoginBtnState("Login");
        if(clientState.parcelIsFound === false) { // Only people who have found a parcel can be on this page
            navigate('/InvalidRequest?_Redirect');
        } else {
            handleParcelInformation();
        }
    }, []);

    useLocalStorageListener();

    return (
        <AnimatePresence>
            <motion.div>
                <div className = 'QueryFormDiv' {...fadeAnimation}>
                    <QueryForm
                        errors = { errors }
                        register = {register}
                        handleSubmit = {handleSubmit(handleQuery)}
                        isParcelForm = {true}
                    />
                </div>
            </motion.div>
            {
                parcelSnapshot && (
                    <motion.div {...fadeAnimation}>
                        <div className = 'ParcelHistoryContainer'>
                            <ParcelHistory 
                                address={parcelSnapshot.address}
                                information={parcelSnapshot.information}
                                location={parcelSnapshot.location}
                                recipient={parcelSnapshot.recipient}
                                visualCue={parcelSnapshot.visualCue}
                                locationHistory={parcelSnapshot.locationHistory}
                                informationHistory={parcelSnapshot.informationHistory}
                                cueHistory={parcelSnapshot.cueHistory}
                                timeDelivered={parcelSnapshot.timeDelivered} 
                                provider= ''                         
                            />
                        </div>
                    </motion.div>
                )
            }
            <motion.div>
                <CustomButton 
                    btnType = '' 
                    btnText = {loginBtnState}
                    customStyles = 'fixed text-white h-8 w-20 cursor-pointer items-center justify-between mt-2'
                    handleClick = {async () => await handleAction()}
                    image = ''
                    cssName = 'globalLoginBtn'              
                />
            </motion.div>
            <motion.div>
                <CustomButton 
                    btnType = 'img'
                    btnText = ''
                    customStyles = ''
                    handleClick={() => {
                        clientState.parcelIsFound = false;
                        clientState.parcelID = '';
                        navigate(HOME);
                    }}
                    image = { returnBtn }
                    cssName = 'returnBtnGlobal cursor-pointer'             
                />
            </motion.div>
            <motion.div>
                <CustomDecorations 
                    decors={[
                        {
                            iconName: ParcelHistoryBG,
                            cssName: 'parcelHistoryBG',
                            customStyles: 'w-full h-full m-0 overflow-hidden box-border fixed pointer-events-none'
                        },
                        {
                            iconName: whiteCircle,
                            cssName: 'phWC1',
                            customStyles: ''
                        },
                        {
                            iconName: whiteCircle,
                            cssName: 'phWC2',
                            customStyles: ''
                        },
                        {
                            iconName: whiteCircle,
                            cssName: 'phWC3',
                            customStyles: ''
                        },
                        {
                            iconName: pinkSquare,
                            cssName: 'phPS1',
                            customStyles: ''
                        },
                        {
                            iconName: pinkSquare,
                            cssName: 'phPS2',
                            customStyles: ''
                        },
                        {
                            iconName: pinkSquare,
                            cssName: 'phPS3',
                            customStyles: ''
                        },
                        {
                            iconName: pinkSquare,
                            cssName: 'phPS4',
                            customStyles: ''
                        },
                        {
                            iconName: pinkSquare,
                            cssName: 'phPS5',
                            customStyles: ''
                        },
                        {
                            iconName: whiteSquare,
                            cssName: 'phWS1',
                            customStyles: ''
                        },
                    ]} 
                />
            </motion.div>
        </AnimatePresence>
    );
};