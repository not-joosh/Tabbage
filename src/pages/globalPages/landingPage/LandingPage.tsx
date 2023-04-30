import { useNavigate } from "react-router-dom";
import { CustomButton, CustomDecorations } from "../../../components/componentConfig";
import { AnimatePresence, motion } from "framer-motion";
import { fadeAnimation } from "../../../lib/helpers/Motion";
import { useLocalStorageListener } from "../../../lib/helpers/LocalStorageListener";
import { Center } from '@chakra-ui/react';
import { HOME } from "../../../lib/routes";
import '../../../stylesheets/LandPageStyle.css';
import { 
    darkCircle, darkCloud, darkSquare , whiteCloud,
    whiteSquare, pinkSquare, whiteCircle
} from "../../../assets/assetsConfig";

export const LandingPage = () => {
    const navigate = useNavigate();
    // Calling the useLocalStorageListener function to set up the listener
    useLocalStorageListener();
    return (
        <AnimatePresence>
            <Center>
                <motion.div {...fadeAnimation}>
                    <h1 className = "lpTabText">
                        Tab
                        <span className ="lpBageText text-indigo-100">
                            bage
                        </span>
                    </h1>
                </motion.div>
                <motion.div {...fadeAnimation}>
                    <CustomButton
                        btnText='Get Started'
                        btnType = ''
                        customStyles = 'hover:bg-purple-300'
                        handleClick={() => navigate(HOME)}
                        image= ""
                        cssName = 'lpGSbtn'
                    />
                </motion.div>
            </Center>
            <motion.div {...fadeAnimation}>
                <CustomDecorations 
                    decors = {[
                        {
                            iconName: whiteSquare,
                            cssName: 'lpWS1',
                            customStyles: '',
                        },
                        {
                            iconName: whiteSquare,
                            cssName: 'lpWS2',
                            customStyles: '',
                        },
                        {
                            iconName: darkSquare,
                            cssName: 'lpDS1',
                            customStyles: '',
                        },
                        {
                            iconName: darkSquare,
                            cssName: 'lpDS2',
                            customStyles: '',
                        },

                        {
                            iconName: whiteCircle,
                            cssName: 'lpWC1',
                            customStyles: '',
                        },
                        {
                            iconName: whiteCircle,
                            cssName: 'lpWC2',
                            customStyles: '',
                        },
                        {
                            iconName: whiteCircle,
                            cssName: 'lpWC3',
                            customStyles: '',
                        },
                        {
                            iconName: pinkSquare,
                            cssName: 'lpPS1',
                            customStyles: '',
                        },
                        {
                            iconName: pinkSquare,
                            cssName: 'lpPS2',
                            customStyles: '',
                        },
                        {
                            iconName: whiteCloud,
                            cssName: 'lpWCLOUD1',
                            customStyles: '',
                        },
                        {
                            iconName: whiteCloud,
                            cssName: 'lpWCLOUD2',
                            customStyles: '',
                        },
                        {
                            iconName: darkCloud,
                            cssName: 'lpDCLOUD1',
                            customStyles: '',
                        },
                        {
                            iconName: darkCloud,
                            cssName: 'lpDCLOUD2',
                            customStyles: '',
                        },
                    ]}
                />
            </motion.div>
        </AnimatePresence>
    );
};