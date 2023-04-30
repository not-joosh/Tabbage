import { AnimatePresence, motion } from "framer-motion";
import { fadeAnimation } from "../lib/helpers/Motion";
import { Parcel } from "../hooks/hooksConfig";
import { 
    orderPlaced as orderPlacedCue,
    preparing as preparingCue,
    inTransit as transitCue, 
    delivered as deliveredCue
} from "../assets/assetsConfig";

const IMAGE_BY_CUE: Record<string, string> = {
  orderPlaced: orderPlacedCue,
  preparing: preparingCue,
  inTransit: transitCue,
  delivered: deliveredCue,  
}

export const ParcelHistory = (parcelIn: Parcel) => {
    return ( 
        <AnimatePresence>
            <motion.div {...fadeAnimation}>
                <div className = "parcel-history">
                    {parcelIn.cueHistory.map((cue, index) => (
                        <>
                            <div key={index} className = "history-entry">
                                <div className = "imageContainer">
                                    <img 
                                        className = 'phIcon' 
                                        src={IMAGE_BY_CUE[cue.cueName]} 
                                        alt={cue.cueName} 
                                    />
                                </div>
                                <div className = 'phInfo'>
                                    <div> {cue.timeStamp} </div>
                                    <div> {parcelIn.locationHistory[index]} </div>
                                    <div> 
                                        {parcelIn.informationHistory[index]} 
                                    </div>
                                    <div>
                                        Recipient: {parcelIn.recipient} 
                                    </div>
                                </div>
                            </div>
                            <div className = 'historyDots'>
                                <div className = 'historyDot'>
                                    .
                                </div>
                                <div className = 'historyDot'>
                                    .
                                </div>
                                <div className = 'historyDot'>
                                    .
                                </div>
                            </div>
                        </>
                    ))}
                    </div>
            </motion.div>
        </AnimatePresence>
    );
};