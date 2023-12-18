//React
import {
    useState,
    useContext,
    useEffect
} from 'react';

//Router
import { useNavigate } from 'react-router-dom';

//Ctx
import { AppContext } from '../../../context/App';

//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

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
    //Context
    const { appState } = useContext(AppContext);

    //State
    const [loaded, setLoaded] = useState<boolean>(false);

    //Hooks
    const navigate = useNavigate();


    //propsok hatása a komponensre
    useEffect(() => {
        if (props.selected) {
            props.onChange(props.id);
        }
    }, [props.id, props.selected]);


    /**
     * openEditor
     * 
     * Szerkesztő megnyitása az adatokkal
     */
    const openEditor = () => {
        navigate('/editor', {
            state: {
                id: props.id,
                name: props.name,
                image: props.image,
                path: props.path
            }
        });
    }


    return (
        <div
            className={`${styles.container} ${props.className}`}
            data-selected={props.selected}>
            <div 
                className={styles.modify} 
                data-visibility={appState.locked}
                onClick={openEditor}>
                <FontAwesomeIcon icon={faPencil} />
            </div>
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
