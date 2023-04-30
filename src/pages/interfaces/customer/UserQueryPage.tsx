import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
import { QueryForm, QueryFormData } from '../../../components/QueryForm'; 
import { useLocalStorageListener } from '../../../lib/helpers/LocalStorageListener';
import { useForm } from 'react-hook-form';
import { HandleErrors, ParcelQuerySchema, useParcel } from '../../../hooks/hooksConfig';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeAnimation } from '../../../lib/helpers/Motion';
import { CustomButton, CustomDecorations, ErrorModal, LoadingIcon } from '../../../components/componentConfig';
import { auth } from '../../../store/firebase/firebaseConfig';
import { useNavigate } from 'react-router';
import { HOME, LOGIN, PARCEL } from '../../../lib/routes';
import { useLogout } from '../../../hooks/auth/useAuth';
import { clientState } from '../../../store/storeConfig';
import '../../../stylesheets/UserQueryStyle.css';
import { 
    InterfaceBG2, whiteSquare, pinkSquare,
    whiteCircle, returnBtn,
} from "../../../assets/assetsConfig";

export const UserQueryPage = () => {
    // States
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isErrorModalOpen, setIsErrorModalOpen] = useState<Boolean>(false);
    const [loginBtnState, setLoginBtnState] = useState<string>('');
    const {getParcel, isLoading} = useParcel();
    const {logout} = useLogout();
    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}} = useForm <QueryFormData> ({
        resolver: yupResolver(ParcelQuerySchema),
    });

    const handleQuery = async (requestQuery: QueryFormData) => {
        try {
            const trackingNumber = requestQuery.trackingNumber.trim();
            await getParcel(trackingNumber, 'data'); // Seeing if the parcel exists
            clientState.parcelIsFound = true;
            clientState.parcelID = trackingNumber;
            navigate(PARCEL);
        } catch(err: unknown) {
            if(err instanceof Error) {
                setErrorMessage(err.message);
                setIsErrorModalOpen(!!errorMessage);
            }
        }
    };

    const handleAction = async () => {
        if(auth.currentUser?.email) { // If User is signed in...
            await logout();
        } else { // If the User is Loggedout
            navigate(LOGIN);
        }
    };
    useEffect(() => {
        // Validating whether or not the user is logged on component mount.
        localStorage.getItem('isLoggedIn')? setLoginBtnState("Logout") : setLoginBtnState("Login");
        const errorMessage = HandleErrors(errors, ['trackingNumber']);
        setErrorMessage(errorMessage);
        setIsErrorModalOpen(!!errorMessage);
    }, [errors]);

    useLocalStorageListener();
    return (
        <AnimatePresence>
            <motion.div {...fadeAnimation}>
                {isLoading && <LoadingIcon />}
                {isErrorModalOpen && (
                    <ErrorModal closeModal={() => setIsErrorModalOpen(false)} errorMessage={errorMessage}> </ErrorModal>
                )}
            </motion.div>
            <div className = 'QFContainer'>
                <QueryForm
                    errors = { errors }
                    register = {register}
                    handleSubmit = {handleSubmit(handleQuery)} 
                    isParcelForm = {false}
                />
            </div>
            <CustomButton 
                btnType = '' 
                btnText = {loginBtnState}
                customStyles = 'fixed text-white h-8 w-20 cursor-pointer items-center justify-between mt-2'
                handleClick = {async () => await handleAction()}
                image = ''
                cssName = 'globalLoginBtn'              
            />
            <motion.div>
                <CustomButton 
                    btnType = 'img'
                    btnText = ''
                    customStyles = ''
                    handleClick={() => navigate(HOME)}
                    image = { returnBtn }
                    cssName = 'returnBtnGlobal cursor-pointer'             
                />
            </motion.div>
            <motion.div>
                <CustomDecorations 
                    decors={[
                        {
                            iconName: InterfaceBG2,
                            cssName: "userQueryBG", 
                            customStyles: "w-full h-full m-0 overflow-hidden box-border fixed pointer-events-none"
                        },
                        {
                            iconName: whiteSquare,
                            cssName: 'uqWS1',
                            customStyles: '',
                        },
                        {
                            iconName: whiteCircle,
                            cssName: 'uqWC1',
                            customStyles: ''
                        },
                        {
                            iconName: whiteCircle,
                            cssName: 'uqWC2',
                            customStyles: '',
                        },
                        {
                            iconName: whiteCircle,
                            cssName: 'uqWC3',
                            customStyles: '',
                        },
                        {
                            iconName: pinkSquare,
                            cssName: 'uqPS1',
                            customStyles: '',
                        },
                        {
                            iconName: pinkSquare,
                            cssName: 'uqPS2',
                            customStyles: '',
                        },
                        {
                            iconName: pinkSquare,
                            cssName: 'uqPS3',
                            customStyles: '',
                        },
                        {
                            iconName: pinkSquare,
                            cssName: 'uqPS4',
                            customStyles: '',
                        }
                    ]}                       
                />
            </motion.div>
        </AnimatePresence>
    );
};