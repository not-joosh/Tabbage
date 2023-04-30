import '../../stylesheets/ModalStyle.css';
type ModalProps = {
    closeModal: () => void;
    children: React.ReactNode;
    errorMessage?: string; 
};
export const ErrorModal = ({ closeModal, children, errorMessage }: ModalProps) => {
    return (
        <div
            className = "cursor-pointer overflow-hidden"
            onClick = {closeModal}
        >
            <div className="modal text-white absolute h-full w-full text-center" >
                <button 
                    onClick = {closeModal} 
                    className = "modalclosebtn w-6 font-bold"
                >&#9747;</button>
                <div className = "modalcontent">
                    <h1 className = "modalprompt">ISSUE HAS OCCURRED</h1>
                    {children}
                    {errorMessage && (
                        <div 
                            className = "modalerror fixed" 
                            dangerouslySetInnerHTML = {{ __html: errorMessage }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};