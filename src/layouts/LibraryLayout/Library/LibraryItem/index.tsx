//React
import {
    useState,
    useEffect
} from 'react';

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
    onChange?: any;
}


/**
 * LibraryItem
 * 
 * Kollekció egy eleme
 * 
 * @param props 
 * @returns 
 */
function LibraryItem(props: Props) {
    //State
    const [loaded, setLoaded] = useState<boolean>(false);


    //propsok hatása a komponensre
    useEffect(() => {
        if (props.selected) {
            props.onChange(props.id);
        }
    }, [props.id, props.selected]);


    return (
        <div
            className={`${styles.container} ${props.className}`}
            data-selected={props.selected}>
            <img
                alt="coverpicture"
                src={props.image}
                className={styles.image}
                data-loaded={loaded}
                onLoad={() => setLoaded(true)} />
        </div>
    )
}

export default LibraryItem;
