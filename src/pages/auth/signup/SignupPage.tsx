import { Center } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { CustomButton, CustomDecorations, ErrorModal, LoadingIcon } from '../../../components/componentConfig';
import { HandleErrors, RegisterSchema, SignUpFormData, useRegister } from '../../../hooks/hooksConfig';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignupForm } from './SignupForm';
import { HOME, LOGIN } from '../../../lib/routes';
import { fadeAnimation } from '../../../lib/helpers/Motion';
import { useNavigate } from 'react-router';
import '../../../stylesheets/SignupStyle.css';
import { 
    InterfaceBG1, returnBtn, pinkSquare,
    darkSquare, whiteCircle, whiteSquare
} from '../../../assets/assetsConfig';
import { useLocalStorageListener } from '../../../lib/helpers/LocalStorageListener';
export const SignUpPage = () => {
    const navigate = useNavigate();
    const {signup, isLoading} = useRegister();
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const {register, handleSubmit, formState: {errors}, reset} = useForm<SignUpFormData>({
        resolver: yupResolver(RegisterSchema),
    });

    const handleRegister = async (inputData: SignUpFormData) => {
        const succeeded = await signup(inputData, HOME);
        if(succeeded) reset();
    };

    useEffect(() => {
        const errorMessage = HandleErrors(errors, [
            'fullName', 'userName', 'email',
            'password', 'confirmPassword', 'accountType'
        ]);
        setErrorMessage(errorMessage);
        setIsErrorModalOpen(!!errorMessage);
    }, [errors]);

    useLocalStorageListener();

    return(
        <AnimatePresence>
            {isLoading && <LoadingIcon />}
                {isErrorModalOpen && (
                <ErrorModal 
                    closeModal={() => setIsErrorModalOpen(false)} 
                    errorMessage={errorMessage}> 
                </ErrorModal>
            )}
            <Center>
                {/*Centering the Form to make absolutely it centered of page*/}
                <motion.div {...fadeAnimation}>
                    <SignupForm 
                        handleSubmit={handleSubmit(handleRegister)}
                        register={register} 
                        errors={errorMessage}
                    />
                </motion.div>
            </Center>
            <div>
            <CustomButton 
                    btnType = "img"
                    btnText = ""
                    cssName = "returnBtnGlobal"
                    customStyles = "fixed h-48 cursor-pointer"
                    image = { returnBtn }
                    handleClick = {() => navigate(LOGIN)}
                />
                <CustomDecorations 
                    decors = {[
                        {
                            iconName: InterfaceBG1,
                            cssName: 'signupbg',
                            customStyles: 'w-full h-full m-0 overflow-hidden box-border fixed pointer-events-none'
                        },
                        {
                            iconName: whiteSquare,
                            cssName: 'suWS1',
                            customStyles: '',
                        },
                        {
                            iconName: whiteSquare,
                            cssName: 'suWS2',
                            customStyles: '',
                        },
                        {
                            iconName: whiteCircle,
                            cssName: 'suWC1',
                            customStyles: '',
                        },
                        {
                            iconName: whiteCircle,
                            cssName: 'suWC2',
                            customStyles: '',
                        },
                        {
                            iconName: whiteCircle,
                            cssName: 'suWC3',
                            customStyles: '',
                        },
                        {
                            iconName: pinkSquare,
                            cssName: 'suPS1',
                            customStyles: '',
                        },
                        {
                            iconName: pinkSquare,
                            cssName: 'suPS2',
                            customStyles: '',
                        },
                        {
                            iconName: darkSquare,
                            cssName: 'suDS1',
                            customStyles: '',
                        },
                        {
                            iconName: darkSquare,
                            cssName: 'suDS2',
                            customStyles: '',
                        },
                        {
                            iconName: darkSquare,
                            cssName: 'suDS3',
                            customStyles: '',
                        },
                    ]}
                />
            </div>
        </AnimatePresence>
    );
};