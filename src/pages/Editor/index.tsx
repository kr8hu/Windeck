//React
import {
    useState,
    useContext
} from 'react';

//Ctx
import { AppContext } from '../../context/App';

//Router
import { useNavigate } from 'react-router-dom';

//useSound
import useSound from 'use-sound';

//Tauri
import {
    confirm,
    message
} from '@tauri-apps/api/dialog';

//Components
import Button from '../../components/Button';

//Layout
import DefaultLayout from '../../layouts/DefaultLayout';

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
    const { appState, setAppState } = useContext(AppContext);

    //Hooks
    const navigate = useNavigate();
    const [playAlertSound] = useSound(alertSound);

    //State
    const [name, setName] = useState<string>(appState.library[appState.selected].name);
    const [path, setPath] = useState<string>(appState.library[appState.selected].path);


    /**
     * modifyItem
     * 
     * Elem módosítása
     */
    const modifyItem = () => {
        setAppState(actionTypes.app.MODIFY_LIBRARY_ITEM, {
            id: appState.selected,
            image: appState.library[appState.selected].image,
            name: name,
            path: path
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
                    setAppState(actionTypes.app.DELETE_LIBRARY_ITEM, appState.selected);
                    navigate(-1);
                }
            });
    }


    return (
        <DefaultLayout menuItems={menuItems}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <span className={styles.heading}>
                            Borítókép
                        </span>
                        <img
                            className={styles.picture}
                            src={appState.library[appState.selected].image}
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
                                className={styles.modify}
                                text="Módosítások mentése"
                                onClick={modifyItem} />
                            <Button
                                className={styles.delete}
                                text="Eltávolítás"
                                onClick={deleteItem} />
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default Editor;
