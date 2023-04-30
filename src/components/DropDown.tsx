import '../stylesheets/DropDownStyle.css';

export interface ActiveParcelProps {
    parcelArr: string[];
    handleChoice: (trackingNumber: string) => void;
};

export const DropDown = ({parcelArr, handleChoice}: ActiveParcelProps) => {
    if(parcelArr.length <= 0) {
        return (
            <div>No Parcels Found.</div>
        );
    } else {
        return (
            <div className = 'DropDownBox'>
                {parcelArr.map((trackingNumber) => {
                    return (
                        <div className = 'DropDownOptions'>
                            <option key = {trackingNumber}  onClick = { () => handleChoice(trackingNumber)}>
                                {trackingNumber}
                            </option>
                        </div>
                    );
                })}        
            </div>
        );
    }
};