//React
import { useContext } from "react";

//Context
import { AppContext } from "../context/App";


/**
 * useApp
 * 
 * @returns 
 */
const useApp = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error('A useApp hook nem használható az AppProvider komponensen kívül.');
    }
    
    return context
}

export default useApp;