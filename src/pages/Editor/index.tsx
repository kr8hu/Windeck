//React
import {
    useState,
    useContext
} from 'react';

//Ctx
import { AppContext } from '../../context/App';

//Router
import {
    useLocation,
    useNavigate
} from 'react-router-dom';

//useSound
import useSound from 'use-sound';

//Tauri
import { confirm, message } from '@tauri-apps/api/dialog';

//Components
import Button from '../../components/Button';
import Template from '../../components/Template';

//Local
import menuItems from './menuItems';

//Shared
import { actionTypes } from '../../shared/const';

//Assets
import alertSound from "../../assets/sounds/alert.mp3";

//Styles
import styles from './Editor.module.css';


/**
 * Editor
 * 
 * @returns 
 */
function Editor() {
    //Context
    const { setAppState } = useContext(AppContext);

    //Hooks
    const location = useLocation();
    const navigate = useNavigate();
    const [playAlertSound] = useSound(alertSound);

    //State
    const [name, setName] = useState<string>(location.state.name);
    const [path, setPath] = useState<string>(location.state.path);


    /**
     * modifyItem
     * 
     * Elem módosítása
     */
    const modifyItem = () => {
        setAppState(actionTypes.app.MODIFY_LIBRARY_ITEM, {
            id: location.state.id,
            image: location.state.image,
            name,
            path
        });

        message("A módosítások végrehajtva.", { type: "info" });
    }


    /**
     * deleteItem
     * 
     * Elem törlése
     */
    const deleteItem = () => {
        playAlertSound();

        confirm('Biztosan törölni szeretnéd a kijelölt elemet?', { type: 'warning' })
            .then((res: boolean) => {
                if (res === true) {
                    setAppState(actionTypes.app.DELETE_LIBRARY_ITEM, location.state.id);
                    navigate(-1);
                }
            });
    }


    return (
        <div className={styles.container}>
            <Template menuItems={menuItems}>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <div className={styles.editor}>
                            <div className={styles.row}>
                                <div className={styles.col}>
                                    <span className={styles.heading}>
                                        Borítókép
                                    </span>
                                    <img
                                        className={styles.picture}
                                        src={location.state.image}
                                        alt="boritokep" />
                                </div>
                                <div className={styles.col}>
                                    <span className={styles.heading}>
                                        Név
                                    </span>
                                    <input
                                        className={styles.input}
                                        value={name}
                                        onChange={(e: any) => setName(e.target.value)} />

                                    <span className={styles.heading}>
                                        Elérési útvonal
                                    </span>
                                    <input
                                        className={styles.input}
                                        value={path}
                                        readOnly
                                        onChange={(e: any) => setPath(e.target.value)} />

                                    <div className={styles.buttonGroup}>
                                        <Button
                                            text="Módosítások mentése"
                                            onClick={modifyItem} />
                                        <Button
                                            text="Eltávolítás"
                                            className={styles.delete}
                                            onClick={deleteItem} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Template>
        </div>
    )
}

export default Editor;
