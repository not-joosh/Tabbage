// /*
// *   IMPORTS
// */
import { Center } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { LoginForm } from './LoginForm';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { HandleErrors, LoginFormData, LoginSchema, useLogin } from '../../../hooks/hooksConfig';
import { CustomButton, CustomDecorations, ErrorModal, LoadingIcon } from '../../../components/componentConfig';
import { HOME, SIGNUP } from '../../../lib/routes';
import { fadeAnimation, headTextAnimation } from '../../../lib/helpers/Motion';
import { useNavigate } from 'react-router';
import { 
    InterfaceBG1, returnBtn, pinkSquare,
    darkSquare, whiteCircle, whiteSquare
} from '../../../assets/assetsConfig';
import '../../../stylesheets/LoginStyle.css';
import { useLocalStorageListener } from '../../../lib/helpers/LocalStorageListener';
/*
*   LOGIN COMPONENT
*/

export const LoginPage = () => {
    /*
    *   HOOKFORM RESOLVER FOR Yup Validation Schema
    */
    const {register, handleSubmit, formState: {errors}, reset} = useForm <LoginFormData> ({
        resolver: yupResolver(LoginSchema),
    });
    // useStates 
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isErrorModalOpen, setIsErrorModalOpen] = useState<Boolean>(false);
    const { login, isLoading } = useLogin();
    const navigate = useNavigate();

    const handleLogin = async (userInput: LoginFormData) => {
        const succeeded = await login(userInput.userEmail, userInput.userPassword, HOME);
        if(succeeded) reset();
    };

    useEffect(() => {
        const errStr = HandleErrors(errors, ['userEmail', 'userPassword']);
        setErrorMessage(errStr);
        setIsErrorModalOpen(!!errorMessage);
    }, [errors]);
    
    useLocalStorageListener();

    return (
        <AnimatePresence>
            <motion.div>
                {isLoading && <LoadingIcon />}
                    {isErrorModalOpen && (
                    <ErrorModal 
                        closeModal={() => setIsErrorModalOpen(false)} 
                        errorMessage={errorMessage}> 
                    </ErrorModal>
                )}  
                <Center>
                    <div>
                        <LoginForm 
                            handleNav = {() => navigate(SIGNUP)}
                            handleSubmit = {handleSubmit(handleLogin)}
                            register = {register} 
                            errors = {errors}                        
                        />
                    </div>
                </Center>
            </motion.div>
            <motion.div>
                <CustomDecorations
                    decors = {[
                        {
                            iconName: InterfaceBG1, 
                            cssName: "loginbgimg", 
                            customStyles: "w-full h-full m-0 overflow-hidden box-border fixed pointer-events-none"
                        },
                        {
                            iconName: '', 
                            cssName: '', 
                            customStyles: ''
                        },
                        {
                            iconName: whiteSquare,
                            cssName: 'lipWS1',
                            customStyles: '',
                        },
                        {
                            iconName: whiteSquare,
                            cssName: 'lipWS2',
                            customStyles: '',
                        },
                        {
                            iconName: whiteSquare,
                            cssName: 'lipWS3',
                            customStyles: '',
                        },
                        {
                            iconName: whiteCircle,
                            cssName: 'lipWC1',
                            customStyles: '',
                        },
                        {
                            iconName: whiteCircle,
                            cssName: 'lipWC2',
                            customStyles: '',
                        },
                        {
                            iconName: whiteCircle,
                            cssName: 'lipWC3',
                            customStyles: '',
                        },
                        {
                            iconName: darkSquare,
                            cssName: 'lipDS1',
                            customStyles: '',
                        },
                        {
                            iconName: pinkSquare,
                            cssName: 'lipPS1',
                            customStyles: '',
                        },
                        {
                            iconName: pinkSquare,
                            cssName: 'lipPS2',
                            customStyles: '',
                        },
                        {
                            iconName: pinkSquare,
                            cssName: 'lipPS3',
                            customStyles: '',
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