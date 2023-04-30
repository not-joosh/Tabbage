import { AnimatePresence, motion } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomButton, CustomDecorations, ErrorModal, LoadingIcon } from "../../../components/componentConfig";
import { Center } from "@chakra-ui/react";
import { MerchantGenerateForm, MerchantGenerateFormData, MerchantGenerateSchema } from "./MerchantGenrateForm";
import { HandleErrors, useLogout } from "../../../hooks/auth/useAuth";
import { fadeAnimation } from "../../../lib/helpers/Motion";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParcel } from "../../../hooks/hooksConfig";
import { useNavigate } from "react-router";
import { HOME } from "../../../lib/routes";
import '../../../stylesheets/MerchantGeneratePage.css';
import { 
    InterfaceBG3, returnBtn, whiteCircle, whiteSquare, darkCircle, darkSquare, pinkSquare,
} from "../../../assets/assetsConfig";
import { useLocalStorageListener, validateLocalStorage } from "../../../lib/helpers/LocalStorageListener";

export const MerchantGeneratePage = () => {
    // Hooks and States
    const navigate = useNavigate();
    const { createParcel, trackingNumber, isLoading } = useParcel();
    const { logout } = useLogout();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isErrorModalOpen, setIsErrorModalOpen] = useState<Boolean>(false);

    const {register, handleSubmit, formState: {errors}, reset} = useForm <MerchantGenerateFormData> ({
        resolver: yupResolver(MerchantGenerateSchema),
    });

    const handleLogout = async () => {
        await logout();
    };

    const handleParcelCreation = async (dataIn: MerchantGenerateFormData) => {
        try {
            await createParcel(dataIn.address, dataIn.recipient);
            reset();
        } catch(err: unknown) {
            if(err instanceof Error)
                alert(err.message);
        };
    };
    useEffect(() => {
        const isMerchant = validateLocalStorage('merchant');
        if(!isMerchant) navigate('/InvalidRequest?_Redirect');
        const errorMessage = HandleErrors(errors, ['address', 'recipient']);
        setErrorMessage(errorMessage);
        setIsErrorModalOpen(!!errorMessage);
    }, []);

    useLocalStorageListener();

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
                    <div>
                        {/*FORM*/}
                        <MerchantGenerateForm
                            handleSubmit = {handleSubmit(handleParcelCreation)}
                            errors = {errors}
                            register = {register}
                            trackingNumber = {trackingNumber}
                        />
                    </div>
                </Center>
            </motion.div>
            <div>
                {/*Custom Butons*/}
                <CustomButton 
                    btnType = 'img'
                    btnText = ''
                    customStyles={""} 
                    handleClick={() => navigate(HOME)}
                    image= {returnBtn} 
                    cssName = 'returnBtnGlobal cursor-pointer'                
                />
                <CustomButton 
                    btnType = ''
                    btnText = 'Logout' 
                    customStyles = 'mt-2 fixed text-white w-24 h-8' 
                    handleClick = {async() => await handleLogout()}
                    image = ''
                    cssName = 'globalLoginBtn'                
                />
            </div>
            <div>
                {/*CUSTOM DECORATIONS*/}
                <CustomDecorations 
                    decors = {[
                        {
                            iconName: InterfaceBG3,
                            cssName: 'merchantPagebg',
                            customStyles: 'w-full h-full m-0 overflow-hidden box-border fixed pointer-events-none'
                        },
                        {
                            iconName: whiteCircle,
                            cssName: 'mgWC1',
                            customStyles: '',
                        },
                        {
                            iconName: whiteCircle,
                            cssName: 'mgWC2',
                            customStyles: '',
                        },
                        {
                            iconName: whiteSquare,
                            cssName: 'mgWS1',
                            customStyles: '',
                        },
                        {
                            iconName: pinkSquare,
                            cssName: 'mgPS1',
                            customStyles: '',
                        },
                        {
                            iconName: pinkSquare,
                            cssName: 'mgPS2',
                            customStyles: '',
                        },
                        {
                            iconName: pinkSquare,
                            cssName: 'mgPS3',
                            customStyles: '',
                        },
                        {
                            iconName: darkCircle,
                            cssName: 'mgDC1',
                            customStyles: '',
                        },
                        {
                            iconName: darkSquare,
                            cssName: 'mgDS1',
                            customStyles: '',
                        },
                        {
                            iconName: darkSquare,
                            cssName: 'mgDS2',
                            customStyles: '',
                        },
                    ]}                    
                />
            </div>
        </AnimatePresence>
    );
};