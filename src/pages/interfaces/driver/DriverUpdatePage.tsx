import { useEffect, useState } from "react";
import { useLocalStorageListener, validateLocalStorage } from "../../../lib/helpers/LocalStorageListener";
import { useNavigate } from "react-router";
import { HandleErrors, useParcel } from "../../../hooks/hooksConfig";
import { AnimatePresence, motion } from "framer-motion";
import { CustomButton, CustomDecorations, ErrorModal, LoadingIcon } from "../../../components/componentConfig";
import { fadeAnimation } from "../../../lib/helpers/Motion";
import { useLogout } from "../../../hooks/auth/useAuth";
import { Center } from "@chakra-ui/react";
import { DriverUpdateForm, DriverUpdateFormData, DriverUpdateSchema } from "./DriverUpdateForm";

import { 
    InterfaceBG5, whiteCircle, pinkSquare, darkCircle, whiteSquare, returnBtn
} from "../../../assets/assetsConfig";
import '../../../stylesheets/DriverUpdatePageStyles.css';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { HOME } from "../../../lib/routes";

export const DriverUpdatePage = () => {
    const navigate = useNavigate();
    const { updateParcel, isLoading } = useParcel();
    const { logout } = useLogout();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isErrorModalOpen, setIsErrorModalOpen] = useState<Boolean>(false);
    
    const {register, handleSubmit, formState: {errors}, reset} = useForm <DriverUpdateFormData> ({
        resolver: yupResolver(DriverUpdateSchema),
    });

    const handleLogout = async () => {
        await logout();
    };

    const handleParcelUpdate = async (dataIn: DriverUpdateFormData) => {
        try {
            const success = await updateParcel(dataIn.parcelID, dataIn.cue, dataIn.information, dataIn.location);
            if(success) reset();
        } catch (err: unknown) {
            if(err instanceof Error)
                alert(err.message);
        };
    };
    useEffect(() => {
        const isDriver = validateLocalStorage('driver');
        if(!isDriver) navigate('/InvalidRequest?_Redirect');
        const errorMessage = HandleErrors(errors, ['parcelID', 'location', 'information']);
        setErrorMessage(errorMessage);
        setIsErrorModalOpen(!!errorMessage);
    }, [errorMessage]);

    useLocalStorageListener();
    
    return (
        <AnimatePresence>
            <motion.div {...fadeAnimation}>
                {isLoading && <LoadingIcon />}
                {isErrorModalOpen && (
                    <ErrorModal closeModal={() => setIsErrorModalOpen(false)} errorMessage={errorMessage}> </ErrorModal>
                )}
            </motion.div>
            <motion.div>
                <Center>
                    <div>
                        <DriverUpdateForm
                            handleSubmit = {handleSubmit(handleParcelUpdate)}
                            errors = {errors}
                            register = {register}
                        />
                    </div>
                </Center>
            </motion.div>
            <motion.div>
                <CustomButton 
                    btnType = ''
                    btnText = 'Logout' 
                    customStyles = 'mt-2 fixed text-white w-24 h-8' 
                    handleClick = {async() => await handleLogout()}
                    image = ''
                    cssName = 'globalLoginBtn'                
                />
            </motion.div>
            <motion.div>
                <CustomDecorations 
                    decors = {[
                        {
                            iconName: InterfaceBG5,
                            cssName: 'dUpdatePageBG',
                            customStyles: 'w-full h-full m-0 overflow-hidden box-border fixed pointer-events-none'
                        },
                        {
                            iconName: whiteCircle,
                            cssName: 'dUpdateWC1',
                            customStyles: ''
                        },
                        {
                            iconName: whiteCircle,
                            cssName: 'dUpdateWC2',
                            customStyles: ''
                        },
                        {
                            iconName: darkCircle,
                            cssName: 'dUpdateDC1',
                            customStyles: ''
                        },
                        {
                            iconName: whiteSquare,
                            cssName: 'dUpdateWS1',
                            customStyles:''
                        },
                        {
                             iconName: pinkSquare,
                             cssName: 'dUpdatePS1',
                             customStyles:''
                        },
                        {
                            iconName: pinkSquare,
                            cssName: 'dUpdatePS2',
                            customStyles:''
                        },
                        {
                            iconName: pinkSquare,
                            cssName: 'dUpdatePS3',
                            customStyles:'',
                        },
                        {
                            iconName: pinkSquare,
                            cssName: 'dUpdatePS4',
                            customStyles:'',
                         },
                    ]}                
                />
            </motion.div>
            <motion.div>
                <CustomButton
                    btnType = 'img' 
                    btnText = '' 
                    customStyles = 'fixed h-48 cursor-pointer'
                    handleClick = {() => navigate(HOME)}
                    image = { returnBtn }
                    cssName = 'returnBtnGlobal'        
                />
            </motion.div>
        </AnimatePresence>
    );
};