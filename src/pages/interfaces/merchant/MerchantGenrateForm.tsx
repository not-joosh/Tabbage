import * as yup from 'yup';

export const MerchantGenerateSchema = yup.object().shape({
    address: yup.string().required("Please enter the destination address."),
    recipient: yup.string().required('Please enter the recipient.')
});
export interface MerchantGenerateFormData {
    address: string;
    recipient: string;
};
interface MerchantFormProps {
    handleSubmit: () => void;
    errors: any;
    register: any;
    trackingNumber: string;
};
export const MerchantGenerateForm = ({handleSubmit, errors, register, trackingNumber}: MerchantFormProps) => {
    return (
        <div className = 'genFormWrapper'>
            <div className = 'genFormBox'>
                <form className = 'genForm' onSubmit = {handleSubmit}>
                    <div className = 'genForminputgroup'>
                        <div className = 'genFormRecipientBox'>
                            <div className = 'recipientFormTitle'>Recipient:</div>
                            <input 
                                className = 'genFormRecipientfield'
                                type = 'text' 
                                placeholder = 'Enter Details...'
                                {...register('recipient')}
                            />
                        </div>
                        <div className = 'genFormAddressBox'>
                            <div className = 'addressFormTitle'>Address:</div>
                            <input 
                                className = 'genFormAddressfield'
                                type = "text" 
                                placeholder = "Enter Details..."
                                {...register('address')}
                            />
                        </div>
                        <div className = 'genTrackNumContainer'>
                            <div className = 'trackingNumberTitle'>Tracking Number</div>
                            <div className = 'gennedTrackingNumber'>{trackingNumber? trackingNumber : "N/A"}</div>
                        </div>
                        <div className = 'genFormBtn' >
                            <input 
                                className = 'genButtonStyle hover: cursor-pointer'
                                type = 'submit' 
                                value= 'Generate'
                            />
                    </div>
                    </div>
                </form>
            </div>
        </div>
    );
};