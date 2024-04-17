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
    onClick?: (index: number) => void;
}


/**
 * LibraryItem
 * 
 * @param props 
 * @returns 
 */
function LibraryItem(props: Props) {
    //States
    const [loaded, setLoaded] = useState<boolean>(false);


    /**
     * onClickHandler
     * 
     */
    const onClickHandler = () => {
        if(!props.onClick) return;

        props.onClick(props.id);
    }


    return (
        <div
            className={`${styles.container} ${props.className}`}
            data-selected={props.selected}
            onClick={onClickHandler}>
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
