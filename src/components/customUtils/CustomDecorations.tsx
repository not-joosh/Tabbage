
/*
*
*   Dynamic Decoration Component
*
*/

interface DecorationObj {
    iconName: string;
    cssName: string;
    customStyles: string;
}

interface DecorationProps {
    decors: DecorationObj[];
}

export const CustomDecorations = ({decors}: DecorationProps) => {
    return (
        <div>
            {decors.map((icon: DecorationObj) => {
                return (
                    <img
                        src = {icon.iconName}
                        className= {`${icon.cssName} ${" "} ${icon.customStyles}`}
                    />
                );
            })}
        </div>
    );
};