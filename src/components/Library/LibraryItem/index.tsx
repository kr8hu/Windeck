//React
import {
    useState,
    useContext,
    useEffect
} from 'react';

//useSound
import useSound from 'use-sound';

//Tauri
import { confirm } from '@tauri-apps/api/dialog';

//Ctx
import { AppContext } from '../../../context/App';

//Shared
import { actionTypes } from '../../../shared/const';

//Assets
import alertSound from "../../../assets/sounds/alert.mp3";

//Styles
import styles from './LibraryItem.module.css';


let buttonPressTimer: any;


/**
 * Props
 * 
 */

interface Props {
    className?: any;
    id: number;
    name: string;
    image: any;
    selected: boolean;
    onChange?: any;
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
    //Context
    const { setAppState } = useContext(AppContext);

    //State
    const [loaded, setLoaded] = useState<boolean>(false);

    //Hooks
    const [playAlertSound] = useSound(alertSound);


    //propsok hatása a komponensre
    useEffect(() => {
        if (props.selected) {
            props.onChange(props.id);
        }
    }, [props.id, props.selected]);


    /**
     * handleButtonPress
     * 
     * Gombnyomásra lefutó funkció
     */
    const handleButtonPress = () => {
        buttonPressTimer = setTimeout(() => deleteItem(), 1500);
    }


    /**
     * handleButtonRelease
     * 
     * Gomb elengedésére lefutó funkció
     */
    const handleButtonRelease = () => {
        clearTimeout(buttonPressTimer);
    }


    /**
     * deleteItem
     * 
     * Elem törlése a könyvtárból
     * 
     * @param id Elem indexe
     */
    const deleteItem = () => {
        if (props.selected) {
            playAlertSound();
            confirm('Biztosan törölni szeretnéd a kijelölt elemet?', { type: 'warning' })
                .then((res: boolean) => {
                    if (res === true) {
                        setAppState(actionTypes.app.DELETE_LIBRARY_ITEM, props.id);
                    }
                });
        }
    }


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
