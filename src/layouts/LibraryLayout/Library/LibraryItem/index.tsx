//React
import { useState } from 'react';

//Styles
import styles from './LibraryItem.module.css';


/**
 * Props
 * 
 */
interface Props {
    className?: any;
    id: number;
    name: string;
    image: any;
    path: string;
    selected: boolean;
}


/**
 * LibraryItem
 * 
 * Könyvtár egy eleme
 * 
 * @param props 
 * @returns 
 */
function LibraryItem(props: Props) {
    //States
    const [loaded, setLoaded] = useState<boolean>(false);


    return (
        <div
            className={`${styles.container} ${props.className}`}
            data-selected={props.selected}>
            <img
                alt="libraryItem"
                src={props.image}
                className={styles.image}
                data-loaded={loaded}
                onLoad={() => setLoaded(true)} />
        </div>
    )
}

export default LibraryItem;
