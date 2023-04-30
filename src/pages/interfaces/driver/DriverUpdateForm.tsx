
import '../../../stylesheets/DriverUpdateFormStyle.css';
import { useState, useEffect } from 'react';
import * as yup from 'yup';

export const DriverUpdateSchema = yup.object().shape({
    parcelID: yup.string().required("Please enter the Parcel Tracking Number."),
    location: yup.string().required('Please enter the new location of the parcel.'),
    information: yup.string().required('Please enter information about the parcel.'),
    cue: yup.string().required('Please select a cue.')
});
export interface DriverUpdateFormData {
    parcelID: string;
    location: string;
    information: string;
    cue: string;
};
interface DriverUpdateFormProps {
    handleSubmit: () => void;
    errors: any;
    register: any;
};
export const DriverUpdateForm = ({handleSubmit, errors, register}: DriverUpdateFormProps) => {
    
    const [selectedCue, setSelectedCue] = useState<string>('');
    
    const onSelect = (event: string) => {
        console.log("ONSELECT WAS CALLED");
        setSelectedCue(event);
        register('cue', { value: event });
    };

    useEffect(() => {
        
    }, [selectedCue]);
    useEffect(() => {
        console.log("THIS IS THE SELECTED CUE:" + selectedCue);
        console.log(errors);
    });
    return (
    
        <div className = 'duFormWrapper'>
            <div className = 'duFormBox'>
                <form onSubmit = {handleSubmit}>
                    <div className = 'dufheader'>
                        <p>Update Parcel Status</p>
                    </div>
                    <div className = 'duFormCueOptions'>
                        <p>Status</p>
                        {/* <button  
                            className="duFormCueTransit"
                            value = "inTransit"
                            // onClick = {() => onSelect('inTransit')}
                            onClick={() => {onSelect('inTransit'); register('cue').setValue('inTransit');}}
                            style = {{
                                backgroundColor: selectedCue === 'inTransit'? '#484262' : 'white',
                                borderRadius: '10%'
                            }}
                        >In Transit</button>
                        <button 
                            className="duFormCueDelivereed" 
                            value = 'delivered'
                            // onClick = {() => onSelect('delivered')}
                            onClick={() => {onSelect('delivered'); register('cue').setValue('delivered');}}
                            style = {{
                                backgroundColor: selectedCue === 'delivered'? '#484262' : 'white',
                                borderRadius: '10%'
                            }}
                        >Delivered</button>
                        <input type="hidden" value={selectedCue} {...register('cue')} /> */}


                        <input
                            className="duFormCueTransit"
                            type="radio"
                            name='cue'
                            value="inTransit"
                            onChange={onSelect}
                            {...register('cue')}
                        />
                        <label
                            style={{
                                backgroundColor: selectedCue === 'inTransit'? '#484262' : 'white',
                                borderRadius: '10%'
                            }}
                        >In Transit</label>
                        <br />
                        <input
                            className="duFormCueDelivereed"
                            type="radio"
                            value="delivered"
                            name='cue'
                            onChange={onSelect}
                            style={{
                                backgroundColor: selectedCue === 'delivered'? '#484262' : 'white',
                                borderRadius: '10%'
                            }}
                            {...register('cue')}
                        />
                        <label className = ''>Delivered</label>


                    </div>
                    <div>
                        <p><label className = 'dupctxt'>Parcel</label></p>
                        <input className = 'duinputBox' placeholder = 'Parcel Tracking Number...' type = 'text' {...register('parcelID')}/>
                    </div>
                    <div>
                        <p><label className = 'duloctxt'>Location</label></p>
                        <input className = 'duinputLoc' placeholder = 'Enter Details...' type = 'text' {...register('location')}/>
                    </div>
                    <div>
                        <p><label className = 'duinfotxt'>Information</label></p>
                        <div><textarea className = 'duinfotxtbox' placeholder = 'Enter Details...' {...register('information')}/></div>
                    </div>
                    <div>
                        <button className = 'duFormSubmitBtn'>
                            <input 
                            className = '' 
                            type = 'submit' 
                            value = 'Confirm Update'
                            />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};