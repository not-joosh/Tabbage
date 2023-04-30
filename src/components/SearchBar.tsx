import '../stylesheets/SearchBarStyle.css';

interface SearchBarProps {
    trackingNumber: string;
};

export const SearchBar = ({trackingNumber}: SearchBarProps) => {
    return (
        <div className = 'searchBarContainer'>
            <div className = 'searchBarBin'>{trackingNumber && trackingNumber}</div>
        </div>  
    );
};