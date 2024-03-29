//React
import {
    useContext,
    useEffect,
    useState
} from 'react';

//useSound
import useSound from 'use-sound';

//Ctx
import { AppContext } from '../../../context/App';

//Tauri
import {
    message,
    open
} from '@tauri-apps/api/dialog';
import { appWindow } from '@tauri-apps/api/window';
import { invoke } from '@tauri-apps/api';

//Components
import DataSummary from '../DataSummary';
import Button from '../../../components/Button';

//Assets
import alertSound from '../../../assets/sounds/alert.mp3';
//import errorSound from '../../../assets/sounds/error.mp3';

//Local
import {
    progress,
    progressData
} from './progress';

//Shared
import { actionTypes } from '../../../shared/const';

//Styles
import styles from './DataEditor.module.css';


/**
 * Editor
 * 
 * @param props 
 * @returns 
 */
function ManagerEditor() {
    //Ctx
    const { setAppState } = useContext(AppContext);


    //States
    const [state, setState] = useState<number>(progress.init);
    const [base64, setBase64] = useState<any>('');
    const [data, setData] = useState<any>({
        exe: '',
        img: '',
        name: ''
    });


    //Hooks
    const [playAlertSound] = useSound(alertSound);


    //Tauri listener hozzáadása
    useEffect(() => {
        addTauriEventListener();
    }, []);


    useEffect(() => {
        if (data.img.length === 0) return;

        createBase64Image();
    }, [data.img]);


    /**
     * addTauriListener
     * 
     * Tauri listener létrehozása
     */
    const addTauriEventListener = async () => {
        await appWindow.listen(
            'base64result',
            ({ event, payload }: { event: any, payload: { result: any } }) => {
                console.log(event);
                setBase64(payload.result);
            }
        );
    }



    /**
     * createBase64Image
     * 
     * Base64 kép generálás
     */
    const createBase64Image = async () => {
        await invoke('base64convert', {
            path: data.img,
            window: appWindow
        });
    }


    /**
     * createLibraryEntry
     * 
     * Létrehoz egy elemet a könyvtárban
     * 
     * @param data 
     * @param base64img 
     */
    const createLibraryEntry = (data: any, base64img: any) => {
        const entry = {
            name: data.name,
            path: data.exe,
            image: 'data:image/jpeg;base64,' + base64img
        }

        setAppState(actionTypes.app.ADD_LIBRARY_ITEM, entry);

        playAlertSound();

        message("Az elem hozzáadva a könyvtárhadhoz.")
            .then(() => clear());
    }


    /**
     * setExecutable
     * 
     * Megnyitja a fájlkezelőt az exe fájl kiválasztásához, 
     * és a kiválasztott program útvonalának továbbítása a statebe
     */
    const setExecutable = async () => {
        const result = await open({
            filters: [{
                name: "Minden fájl",
                extensions: ['exe']
            }]
        });


        //Ha van result
        if (result !== null) {
            setData((prev: any) => ({
                ...prev,
                exe: result
            }));

            setState(progress.setImage);
        }
    }


    /**
     * setImage
     * 
     * Megnyitja a fájlkezelőt az kép fájl kiválasztásához, 
     * és a kiválasztott kép útvonalának továbbítása a statebe
     */
    const setImage = async () => {
        const result = await open({
            filters: [{
                name: "Minden fájl",
                extensions: ['png', 'jpeg', 'jpg']
            }]
        });

        
        if (result !== null) {
            setData((prev: any) => ({
                ...prev,
                img: result
            }));

            setState(progress.setName);
        }
    }



    /**
     * setName
     * 
     * A megadott név felvétele a statebe
     */
    const setName = (value: any) => {
        setData((prev: any) => ({
            ...prev,
            name: value
        }));
    }


    /**
     * onClick
     * 
     */
    const onClick = () => {
        switch (state) {
            case progress.init: {
                setState(progress.setExecutable);
                break;
            }
            case progress.setExecutable: {
                setExecutable();
                break;
            }
            case progress.setImage: {
                setImage();
                break;
            }
            case progress.setName: {
                setState(progress.summary);
                break;
            }
            case progress.summary: {
                createLibraryEntry(data, base64);
                break;
            }
            default: return null;
        }
    }


    /**
     * clear
     * 
     * Stateben szereplő adatok törlése
     */
    const clear = () => {
        //Data értékei
        setData({
            exe: '',
            img: '',
            name: ''
        });

        //Base64 kódolás
        setBase64('');

        //Progress
        setState(progress.init);
    }


    /**
     * render
     */
    const render = () => {
        switch (state) {
            case progress.setName:
                return (
                    <input
                        className={styles.input}
                        type="text"
                        value={data.value}
                        onChange={(e: any) => setName(e.target.value)} />
                )
            case progress.summary:
                return (
                    <DataSummary
                        data={data}
                        base64={base64} />
                )
            default: return null;
        }
    }


    return (
        <div className={styles.container}>
            <span className={styles.heading}>
                {progressData[state].title}
            </span>

            <span className={styles.text}>
                {progressData[state].text}
            </span>

            {render()}

            <Button
                className={styles.button}
                text={progressData[state].buttonLabel}
                onClick={onClick} />
        </div>
    )
}

export default ManagerEditor;
