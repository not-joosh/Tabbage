import { Center } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { QueryForm, QueryFormData } from '../../../components/QueryForm';
import { CustomButton, CustomDecorations, ErrorModal, LoadingIcon } from '../../../components/componentConfig';
import { useNavigate } from 'react-router';
import { ParcelQuerySchema, useParcel } from '../../../hooks/hooksConfig';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { HandleErrors, useLogout } from '../../../hooks/auth/useAuth';
import { 
    InterfaceBG4, whiteSquare, pinkSquare, whiteCircle, darkSquare, darkCircle,
} from '../../../assets/assetsConfig';
import { fadeAnimation } from '../../../lib/helpers/Motion';
import { PARCEL, UPDATEPARCEL } from '../../../lib/routes';
import '../../../stylesheets/DriverHomeStyle.css';
import { clientState } from '../../../store/storeConfig';

export const DriverHome = () => {
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
                <Center>
                    <QueryForm 
                        handleSubmit={handleSubmit(tryQuery)}
                        errors={errors}
                        register={register} 
                        isParcelForm={false}
                    />
                    <div className = 'dhButtonContainer'>
                        <CustomButton 
                            btnType = '' 
                            btnText = 'update parcel'
                            customStyles = ''
                            handleClick={() => {
                                navigate(UPDATEPARCEL);
                            }}
                            image = ''
                            cssName = 'dhUpdateParcelBtn'
                        />
                    </div>
                </Center>
            </motion.div>
            <CustomButton 
                btnType = ''
                btnText = 'Logout' 
                customStyles = 'mt-2 fixed text-white w-24 h-8' 
                handleClick = {async() => await handleLogout()}
                image = ''
                cssName = 'globalLoginBtn'                
            />
            <CustomDecorations 
                decors = {[
                    {
                        iconName: InterfaceBG4,
                        cssName: 'dhBG',
                        customStyles: 'w-full h-full m-0 overflow-hidden box-border fixed pointer-events-none'
                    },
                    {
                        iconName: whiteCircle,
                        cssName: 'dhWC1',
                        customStyles: ''
                    },
                    {
                        iconName: whiteCircle,
                        cssName: 'dhWC2',
                        customStyles: ''
                    },
                    {
                        iconName: whiteSquare,
                        cssName: 'dhWS1',
                        customStyles: ''
                    },
                    {
                        iconName: whiteSquare,
                        cssName: 'dhWS2',
                        customStyles: ''
                    },
                    {
                        iconName: darkSquare,
                        cssName: 'dhDS1',
                        customStyles: ''
                    },
                    {
                        iconName: darkSquare,
                        cssName: 'dhDS2',
                        customStyles: ''
                    },
                    {
                        iconName: pinkSquare,
                        cssName: 'dhPS1',
                        customStyles: ''
                    },  
                    {
                        iconName: pinkSquare,
                        cssName: 'dhPS2',
                        customStyles: ''
                    },
                    {
                        iconName: darkCircle,
                        cssName: 'dhDC1',
                        customStyles: ''
                    },
                ]}
            />
        </AnimatePresence>
    );
};