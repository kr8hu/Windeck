//React
import {
    useState,
    useContext,
    useEffect
} from 'react';

//Tauri
import { confirm } from '@tauri-apps/api/dialog';

//Ctx
import { AppContext } from '../../../context/App';

//Shared
import { actionTypes } from '../../../shared/const';

//Styles
import styles from './LibraryItem.module.css';


let buttonPressTimer: any;


interface Props {
    className?: any;
    id: number;
    name: string;
    image: any;
    selected: boolean;
    onChange?: any;
}
function LibraryItem(props: Props) {
    //Context
    const { setAppState } = useContext(AppContext);

    //State
    const [loaded, setLoaded] = useState<boolean>(false);


    useEffect(() => {
        if(props.selected) {
            props.onChange(props.id);
        }
    }, [props.id, props.selected]);


    /**
     * Gombnyomásra lefutó funkció
     */
    const handleButtonPress = () => {
        buttonPressTimer = setTimeout(() => deleteItem(), 1500);
    }


    /**
     * Gomb elengedésére lefutó funkció
     */
    const handleButtonRelease = () => {
        clearTimeout(buttonPressTimer);
    }


    /**
     * Elem törlése a könyvtárból
     * @param id Elem indexe
     */
    const deleteItem = () => {
        if (props.selected) {
            confirm('Biztosan törölni szeretnéd a kijelölt elemet?')
                .then((res: boolean) => {
                    if (res === true) {
                        setAppState(actionTypes.app.DELETE_LIBRARY_ITEM, props.id);
                    }
                });
        }
    }


    return (
        <div
            onTouchStart={handleButtonPress}
            onTouchEnd={handleButtonRelease}
            onMouseDown={handleButtonPress}
            onMouseUp={handleButtonRelease}
            onMouseLeave={handleButtonRelease}
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
