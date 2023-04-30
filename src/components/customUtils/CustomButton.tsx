
interface CustomButtonProps {
    btnType: string; // Image Type or not
    btnText: string; // Button Text
    customStyles: string; // Custom Styles added to the button if any...
    handleClick: () => void;
    image: string;
    cssName: string;
}

export const CustomButton = ({btnType, btnText, customStyles, handleClick, image, cssName} : CustomButtonProps) => {
    if(btnType === "img" && image) {
        return (
            <img 
                className = {`${cssName} px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
                src = {image}
                onClick= {handleClick}
            />
        );
    }
    else {
        return (
            <button
                className= {`${cssName} ${" "} ${customStyles}`}
                onClick= {handleClick}
            >
            {btnText}
            </button>
        );
    }
};