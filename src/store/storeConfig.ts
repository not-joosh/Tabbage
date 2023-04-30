/*
*       IMPORTS
*/
import { proxy } from "valtio";

export const clientState = proxy({
    accountType: 'customer',
    isValidLocalChange: false,
    parcelIsFound: false,
    parcelID: '',
});