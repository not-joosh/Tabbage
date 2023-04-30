/*
*   https://github.com/CSFrequency/react-firebase-hooks/blob/master/auth/README.md
*       react-firebase-hooks documentation
*
*   IMPORTS
*/
import * as yup from 'yup';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../store/firebase/firebaseConfig';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router';
import { DeepMap, FieldError } from 'react-hook-form';
import { LANDINGPAGE } from '../../lib/routes';
import { clientState } from '../../store/storeConfig';
import { useGetCurrentUser } from '../hooksConfig';
import { isAvailableEmail, isAvailableUsername, saveUserToDatabase } from '../../store/firebase/firebaseFunctions';

/*
*   GLOBAL AUTH INTERFACES
*/

export interface LoginFormData {
    userEmail: string;
    userPassword: string;
};

export interface SignUpFormData {
    fullName: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    accountType: string;
};

/*
*   GLOBAL VALIDATION SCHEMAS
*/

export const LoginSchema = yup.object().shape({
    userEmail: yup.string().email("Must be a valid email...").required("Email field is Required..."),
    userPassword: yup.string().required("Password field is Required..."),
});

export const RegisterSchema = yup.object().shape({
    fullName: yup.string().required("Full name field required..."),
    userName: yup.string().min(3, "Username must be at least 3 characters...").max(15, "Username can contain a maximum of 15 characters...").notOneOf([""], "Username field required...")
        .matches(
            /^[a-zA-Z0-9_.-]*$/,
            `Username can only 
            contain letters, numbers, 
            underscores, periods, and dashes...`
        ).required(),
    email: yup.string().email("Email just be a valid email...").required("Email field required..."),
    password: yup.string().min(6, "Password must contain at least 6 characters...").required("Password field required..."),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match...")
        .required("Please confirm your password..."),
    accountType: yup.string().required("Account type required..."),
});

/*
*   AUTHENTICATION CUSTOM HOOKS
*/

export const useAuth = () => {
    const [authUser, isLoading, error] = useAuthState(auth);
    return { user: authUser, isLoading, error };
};

export const useLogin = () => {
    const [isLoading, setLoading] = useState<boolean | null>(null);
    const { fetchUserInfo } = useGetCurrentUser();
    const toast = useToast();
    const navigate = useNavigate();

    const login = async (email: string, password: string, redirectTo: string) => {
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            toast({
                title: 'Successfully Logged in!',
                status: 'success',
                isClosable: true,
                position: 'top',
                duration: 3000,
            });
            const userType = await fetchUserInfo('accountType');
            clientState.isValidLocalChange = true;
            localStorage.setItem("accountType", userType as string);
            localStorage.setItem('isLoggedIn', "true");
            clientState.accountType = userType as string;
            clientState.isValidLocalChange = false;
            navigate(redirectTo);
        } catch(err: unknown) {
            if(err instanceof Error) {
                toast({
                    title: 'Login Failed!',
                    status: 'error',
                    isClosable: true,
                    position: 'top',
                    description: err.message,
                    duration: 3000,
                });
            }
            setLoading(false);
            return false;
        } finally {
            setLoading(false);
        };
        return true;
    };
    return {login, isLoading};
};

export const useRegister = () => {
    const [isLoading, setLoading] = useState<boolean | null>(null);
    const {login} = useLogin();
    const toast = useToast();
    const signup = async (userInfoIn: SignUpFormData, redirectTo: string) => {
        try {
            setLoading(true);

            // Check if the email and username are already in use
            const emailIsValid = await isAvailableEmail(userInfoIn.email);
            const usernameIsValid = await isAvailableUsername(userInfoIn.userName);
            if(!emailIsValid) 
                throw new Error('Email address is already in use.');
            if(!usernameIsValid)
                throw new Error('Username is already taken.');
            // Creating the Account and Saving it to the database
            await createUserWithEmailAndPassword(auth, userInfoIn.email, userInfoIn.password);
            await saveUserToDatabase({
                fullName: userInfoIn.fullName,
                userName: userInfoIn.userName,
                email: userInfoIn.email,
                password: userInfoIn.password,
                accountType: userInfoIn.accountType,
                confirmPassword: ''
            });
            toast({
                title: 'Successfully Registered!',
                status: 'success',
                isClosable: true,
                position: 'top',
                duration: 3000,
            });
            
            await login(userInfoIn.email, userInfoIn.confirmPassword, redirectTo);
        } catch(err: unknown) {
            if(err instanceof Error) {
                toast({
                    title: 'Registration failed!',
                    status: 'error',
                    isClosable: true,
                    position: 'top',
                    description: err.message,
                    duration: 3000,
                });
            }
            setLoading(false);
            return false;
        } finally {
            setLoading(false);
        };
        return true;
    };
    return {signup, isLoading};
};

export const useLogout = () => {
    const [signOut, isLoading, error] = useSignOut(auth);
    const toast = useToast();
    const navigate = useNavigate();
    const logout = async () => {
        if(await signOut()) {
            toast({
                title: 'Successfully Logged Out!',
                status: 'success',
                isClosable: true,
                position: 'top',
                duration: 3000,
            });
            clientState.isValidLocalChange = true;
            localStorage.clear();
            clientState.accountType = 'customer';
            clientState.isValidLocalChange = false;
            navigate(LANDINGPAGE);
        }
    };
    return {logout};
};

export const HandleErrors = (errors: DeepMap<Record<string, any>, FieldError>, errorsMap: string[]) => {
    let errorMessage = '';
    errorsMap.map((errorTitle) => {
        const error = errors[errorTitle];
        if (error) {
            errorMessage += `<div>${error.message}</div>`;
        }
    });
    return errorMessage;
};