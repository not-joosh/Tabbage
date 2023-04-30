import { AnimatePresence, motion } from "framer-motion";
import { Center } from "@chakra-ui/react";
import { fadeAnimation } from "../../../lib/helpers/Motion";
import { CustomButton, CustomDecorations, ErrorModal, LoadingIcon, QueryForm, QueryFormData } from "../../../components/componentConfig";
import { useEffect, useState } from "react";
import { HandleErrors, useLogout } from "../../../hooks/auth/useAuth";
import { ParcelQuerySchema, useParcel } from "../../../hooks/hooksConfig";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ACTIVEPARCELS, CREATEPARCEL, PARCEL, PASTPARCELS } from "../../../lib/routes";
import '../../../stylesheets/MerchantHomeStyle.css';
import { 
    whiteSquare, pinkSquare,
    whiteCircle, InterfaceBG2
} from "../../../assets/assetsConfig";
import { clientState } from "../../../store/storeConfig";

export const MerchantHome = () => {
    const navigate = useNavigate();
    const [isErrorModalOpen, setIsErrorModalOpen] = useState<Boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const {getParcel, isLoading} = useParcel();
    const { logout } = useLogout();

    // Form Validation 
    const {register, handleSubmit, formState: {errors}} = useForm <QueryFormData> ({
        resolver: yupResolver(ParcelQuerySchema),
    });
    
    const tryQuery = async (queryInput: QueryFormData) => {
        try {
            const trackingNumber = queryInput.trackingNumber.trim();
            await getParcel(trackingNumber, 'data');
            clientState.parcelIsFound = true;
            clientState.parcelID = trackingNumber;
            navigate(PARCEL);
        } catch(err: unknown) {
            if(err instanceof Error)
                setErrorMessage(err.message)
            setIsErrorModalOpen(!!errorMessage);
        };
    };

    const handleLogout = async () => {
        await logout();
    };

    useEffect(() => {
        const errorMessage = HandleErrors(errors, ['trackingNumber']);
        console.log(errorMessage);
        setErrorMessage(errorMessage);
        setIsErrorModalOpen(!!errorMessage);
    }, [errors]);

    return (
        <AnimatePresence>
            <motion.div {...fadeAnimation}>
                {isLoading && <LoadingIcon />}
                {isErrorModalOpen && (
                    <ErrorModal closeModal={() => setIsErrorModalOpen(false)} errorMessage={errorMessage}> </ErrorModal>
                )}
            </motion.div>
            <motion.div {...fadeAnimation}>
                <div className = "QFContainer">
                    <QueryForm
                        handleSubmit={handleSubmit(tryQuery)} // Search for The package History
                        errors={errors}
                        register={register}
                        isParcelForm={false}                        
                    />
                </div>
            </motion.div>
            <Center>
                <motion.div {...fadeAnimation}>
                    <div className = 'mhBtnContainer'>
                        <CustomButton 
                            btnType = ''
                            btnText = 'Active' 
                            customStyles = 'mt-2 text-white w-24 h-8' 
                            handleClick = {() => {
                                navigate(ACTIVEPARCELS);
                            }}
                            image = ''
                            cssName = 'mhActiveBtn'                
                        />
                        <CustomButton 
                            btnType = ''
                            btnText = 'Generate' 
                            customStyles = 'mt-2 text-white w-24 h-8' 
                            handleClick = {() => {
                                navigate(CREATEPARCEL);
                            }}
                            image = ''
                            cssName = 'mhGenBtn'                
                        />
                        <CustomButton 
                            btnType = ''
                            btnText = 'History' 
                            customStyles = 'mt-2 text-white w-24 h-8' 
                            handleClick = {() => {
                                navigate(PASTPARCELS);
                            }}
                            image = ''
                            cssName = 'mhHistoryBtn'                
                        />
                    </div>
                </motion.div>
            </Center>
            <CustomButton 
                btnType = ''
                btnText = 'Logout' 
                customStyles = 'mt-2 fixed text-white w-24 h-8' 
                handleClick = {async() => await handleLogout()}
                image = ''
                cssName = 'globalLoginBtn'                
            /> 
            <CustomDecorations decors={[
                {
                    iconName: InterfaceBG2,
                    cssName: 'mhBG',
                    customStyles: 'w-full h-full m-0 overflow-hidden box-border fixed pointer-events-none'
                },
                {
                    iconName: whiteSquare,
                    cssName: 'mhWS1',
                    customStyles: '',
                },
                {
                    iconName: whiteCircle,
                    cssName: 'mhWC1',
                    customStyles: ''
                },
                {
                    iconName: whiteCircle,
                    cssName: 'mhWC2',
                    customStyles: '',
                },
                {
                    iconName: whiteCircle,
                    cssName: 'mhWC3',
                    customStyles: '',
                },
                {
                    iconName: pinkSquare,
                    cssName: 'mhPS1',
                    customStyles: '',
                },
                {
                    iconName: pinkSquare,
                    cssName: 'mhPS2',
                    customStyles: '',
                },
                {
                    iconName: pinkSquare,
                    cssName: 'mhPS3',
                    customStyles: '',
                },
                {
                    iconName: pinkSquare,
                    cssName: 'mhPS4',
                    customStyles: '',
                }

            ]}/>
        </AnimatePresence>
    );
};