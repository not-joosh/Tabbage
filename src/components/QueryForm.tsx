import { CustomButton } from "./componentConfig";
import { AnimatePresence, motion } from "framer-motion";
import { fadeAnimation } from "../lib/helpers/Motion";
import { searchBtn } from "../assets/assetsConfig";
import '../stylesheets/QueryFormStyle.css';

export interface QueryFormData {
    trackingNumber: string;
};

export interface ParcelQuerySchema {
    trackingNumber: string;
};

interface UserQueryFormProps {
    handleSubmit: () => void;
    errors: any;
    register: any;
    isParcelForm: boolean;
}

export const QueryForm = ({handleSubmit, errors, register, isParcelForm}: UserQueryFormProps) => {
    return (
        <AnimatePresence>
            <div className = 'QFContainer' style = {{
                    top: isParcelForm? '1%' : '45%',
                    left: '35%',
                    backgroundColor: 'transparent',
            }}>
                <div className = 'userQuery-wrapper relative items-center justify-between text-center' style = {{zIndex: '2'}}>
                    <form className = "userQuery-form1 items-center justify-between" style = {{zIndex: '2'}} onSubmit = {handleSubmit}>
                        <motion.div {...fadeAnimation}>
                            <input 
                                type = "text" 
                                className = "userQuery-input h-12 text-center items-center text-3xl" 
                                placeholder='Tracking Number . . .' 
                                style = {{zIndex: '2'}}
                                {...register('trackingNumber')}
                            />
                            <input 
                                type = "submit" 
                                className = "userQuery-submit text-transparent h-10 w-10 border-indigo-900 cursor-pointer items-center justify-between p-0 absolute" 
                                style = {{zIndex: '2', opacity: '0%'}}
                            />
                        </motion.div>
                        <CustomButton 
                            btnType = 'img' 
                            btnText = '' 
                            customStyles = 'text-transparent h-10 w-10 border-indigo-900 cursor-pointer items-center justify-between p-0 absolute pointer-events-none'
                            handleClick = {handleSubmit}
                            image = {searchBtn}
                            cssName = 'userQuery-searchBtn'              
                        />
                    </form>
                </div>
            </div>
        </AnimatePresence>
    );
};