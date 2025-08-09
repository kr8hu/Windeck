//React
import { 
    ReactNode,
    useEffect, 
    useState 
} from 'react';

//Styles
//import styles from './Image.module.css';


/**
 * Props
 */
interface Props {
    className?: any;
    src: string;
    placeholder?: string;
}


/**
 * Image
 * 
 * @param param0 
 * @returns 
 */
function Image({ className, src, placeholder }: Props): ReactNode {

    /**
     * States
     * 
     */
    const [imgSrc, setImgSrc] = useState<any>(src);
    const [error, setError] = useState<boolean>(false);


    /**
     * handleError
     * 
     * Kép betöltésekor fellépő hiba kezelése
     */
    const handleError = () => {
        setError(true);
    };

    
    /**
     * useEffect
     * 
     * Kép forrásának változása
     */
    useEffect(() => {
        setImgSrc(src);
    }, [src]);


    /**
     * useEffect
     * 
     */
    useEffect(() => {
        if (placeholder) {
            if(error) {
                setImgSrc(placeholder);
            }
        }
    }, [placeholder, error]);


    return (
        <img
            alt="Image"
            src={imgSrc}
            className={`${className}`}
            onError={handleError} 
            data-error={error}/>
    );
};

export default Image;
