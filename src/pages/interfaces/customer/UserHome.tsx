import { AnimatePresence, motion } from "framer-motion";
import { useLocalStorageListener } from "../../../lib/helpers/LocalStorageListener";
import { CustomButton, CustomDecorations } from "../../../components/componentConfig";
import { fadeAnimation } from "../../../lib/helpers/Motion";
import { useEffect, useState } from "react";
import { auth } from "../../../store/firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../../hooks/auth/useAuth";
import { FINDPARCEL, LOGIN } from "../../../lib/routes";
import { Center } from "@chakra-ui/react";
import '../../../stylesheets/UserHomeStyle.css';
import { 
    InterfaceBG1, whiteSquare, pinkSquare,
    whiteCircle, darkSquare, darkCircle,
} from "../../../assets/assetsConfig";

export const UserHome = () => {
    const navigate = useNavigate();
    const [loginBtnState, setLoginBtnState] = useState<string>('');
    const { logout } = useLogout();

    const handleAction = async () => {
        if(auth.currentUser?.email) { /*IF THE USER IS LOGGED IN, THEN LOG THEM OUT*/
            await logout();
        } else { // If the User is Loggedout
            navigate(LOGIN);
        }
    };

    useEffect(() => {
        localStorage.getItem('isLoggedIn')? setLoginBtnState("Logout") : setLoginBtnState("Login");
    }, []);
    
     // Calling the useLocalStorageListener function to set up the listener
    useLocalStorageListener();
    return (
        <AnimatePresence>
            <div className = 'fixed overflow-hidden'>
                <div className = 'relative text-center items-center justify-center'>
                    <Center>
                        <motion.div {...fadeAnimation}>
                            <CustomButton 
                                btnType = '' 
                                btnText = 'track a parcel' 
                                customStyles = 'fixed text-indigo-900 bg-white font-bold pl-2 pr-2 h-20 w-56 text-2xl content-center overflow-hidden'
                                handleClick = {() => {navigate(FINDPARCEL)}}
                                image = ''
                                cssName= 'uhTrckPBtn'                
                            />
                        </motion.div>
                        <motion.div {...fadeAnimation}>
                            <CustomButton 
                                btnType = ''
                                btnText = {loginBtnState}
                                customStyles = 'mt-2 fixed text-white w-24 h-8'
                                handleClick = {async () => await handleAction()}
                                image = ''
                                cssName= 'uhLoginBtn'   
                            />
                        </motion.div>
                    </Center>
                    <motion.div>
                        <CustomDecorations 
                            decors = {[
                                {
                                    iconName: InterfaceBG1,
                                    cssName: 'uhBG',
                                    customStyles: 'w-full h-full m-0 overflow-hidden box-border fixed pointer-events-none'
                                },
                                {
                                    iconName: whiteSquare,
                                    cssName: 'uhWS1',
                                    customStyles: '',
                                },
                                {
                                    iconName: whiteSquare,
                                    cssName: 'uhWS2',
                                    customStyles: '',
                                },
                                {
                                    iconName: whiteCircle,
                                    cssName: 'uhWC1',
                                    customStyles: '',
                                },
                                {
                                    iconName: whiteCircle,
                                    cssName: 'uhWC2',
                                    customStyles: '',
                                },
                                {
                                    iconName: whiteCircle,
                                    cssName: 'uhWC3',
                                    customStyles: '',
                                },
                                {
                                    iconName: pinkSquare,
                                    cssName: 'uhPS1',
                                    customStyles: '',
                                },
                                {
                                    iconName: pinkSquare,
                                    cssName: 'uhPS2',
                                    customStyles: '',
                                },
                                {
                                    iconName: pinkSquare,
                                    cssName: 'uhPS3',
                                    customStyles: '',
                                },
                                {
                                    iconName: darkSquare,
                                    cssName: 'uhDS1',
                                    customStyles: '',
                                },
                                {
                                    iconName: darkCircle,
                                    cssName: 'uhDC1',
                                    customStyles: '',
                                },
                                {
                                    iconName: darkCircle,
                                    cssName: 'uhDC2',
                                    customStyles: '',
                                },
                            ]}                    
                        />
                    </motion.div>
                </div>
            </div>
        </AnimatePresence>
    );
};