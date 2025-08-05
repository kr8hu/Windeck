//React
import {
    ReactNode,
    useContext,
    useEffect,
    useState
} from 'react';

//Tauri
//import * as shell from '@tauri-apps/plugin-shell';
import { readFile } from '@tauri-apps/plugin-fs';
import {
    message,
    open
} from '@tauri-apps/plugin-dialog';

//Hooks
import useInput from '../../../../../hooks/useInput';

//Context
import { AppContext } from '../../../../../context/App';

//Components
import DataSummary from './DataSummary';
import Button from '../../../../../components/Button';

//Interfaces
import ILibraryItem from '../../../../../interfaces/LibraryItem';

//Local
import {
    progress,
    progressData
} from './progress';

//Shared
import {
    actionTypes,
    /* touchKeyboardLocation */
} from '../../../../../shared/const';
import { uint8ArrayToBase64 } from '../../../../../shared/utils';

//Styles
import styles from './DataEditor.module.css';


/**
 * DataEditor
 * 
 * @param props 
 * @returns 
 */
function DataEditor(): ReactNode {
    /**
     * Context
     * 
     */
    const { setAppState } = useContext(AppContext);


    /**
     * Hooks
     * 
     */
    const { inputValue, resetValue } = useInput();


    /**
     * States
     * 
     */
    const [state, setState] = useState<number>(progress.setName);
    const [base64, setBase64] = useState<any>('');
    const [error, setError] = useState<string>('');
    const [item, setItem] = useState<ILibraryItem>({
        location: '',
        image: '',
        name: ''
    });


    /**
     * setLocationPath
     * 
     * Megnyitja a fájlkezelőt az exe fájl kiválasztásához, 
     * és a kiválasztott program útvonalának átadása a statebe
     */
    const setLocationPath = async (): Promise<void> => {
        const location = await open({
            filters: [{
                name: "Futtatható fájlok",
                extensions: ['exe']
            }]
        });

        if (location !== null) {
            setItem((prev: any) => ({
                ...prev,
                location
            }));

            setState(progress.setImage);
        }
    }


    /**
     * setImagePath
     * 
     * Megnyitja a fájlkezelőt az kép fájl kiválasztásához, 
     * és a kiválasztott kép útvonalának átadása a statebe
     */
    const setImagePath = async (): Promise<void> => {
        const image = await open({
            filters: [{
                name: "Minden fájl",
                extensions: ['png', 'jpeg', 'jpg']
            }]
        });


        if (image !== null) {
            setItem((prev: any) => ({
                ...prev,
                image
            }));

            setState(progress.setName);
        }
    }


    /**
     * createBase64string
     * 
     * Base64 string generálása a kiválasztott képből
     */
    const createBase64string = async (): Promise<void> => {
        const fileContent = await readFile(item.image);
        const base64string = uint8ArrayToBase64(fileContent);

        if (!fileContent) {
            setError("Hiba történt a kép beolvasása közben.");
            return;
        }

        if (!base64string) {
            setError("Hiba történt a kép feldolgozása közben.");
            return;
        }

        setBase64(base64string);
    }


    /**
     * setName
     * 
     * A megadott név átadása a statebe
     */
    const setName = (value: any): void => {
        setItem((prev: any) => ({
            ...prev,
            name: value
        }));
    }


    /**
     * addToLibrary
     * 
     * Adatok felvétele a könyvtárba
     * 
     * @param item 
     * @param base64img 
     */
    const addToLibrary = (item: ILibraryItem, base64img: any): void => {
        const entry: ILibraryItem = {
            name: item.name,
            location: item.location,
            image: 'data:image/jpeg;base64,' + base64img
        }

        setAppState(actionTypes.app.ADD_LIBRARY_ITEM, entry);

        message("Az elem hozzáadva a könyvtárhadhoz.")
            .then(() => clearProgress());
    }


    /**
     * onClick
     * 
     */
    const onClick = (): any => {
        switch (state) {
            case progress.init: {
                setState(progress.setLocation);
                break;
            }
            case progress.setLocation: {
                setLocationPath();
                break;
            }
            case progress.setImage: {
                setImagePath();
                break;
            }
            case progress.setName: {
                setState(progress.summary);
                break;
            }
            case progress.summary: {
                addToLibrary(item, base64);
                break;
            }
            default: return null;
        }
    }


    /**
     * clearProgress
     * 
     * Teljes folyamat alaphelyzetbe állítása és a stateben szereplő adatok törlése
     */
    const clearProgress = (): void => {
        //item értékei
        setItem({
            location: '',
            image: '',
            name: ''
        });

        //Base64 kódolás
        setBase64('');

        //Progress
        setState(progress.init);
    }


    /**
     * onClickHandler
     * 
     */
    const onClickHandler = (): void => {
        //shell.open(touchKeyboardLocation);
        setAppState(actionTypes.app.SET_KEYBOARD, true);
    }


    /**
     * onBlurHandler
     * 
     */
    const onBlurHandler = (): void => {
        //setAppState(actionTypes.app.SET_KEYBOARD, false);
    }


    /**
     * render
     * 
     */
    const render = (): ReactNode => {
        switch (state) {
            case progress.setName:
                return (
                    <input
                        className={styles.input}
                        type="text"
                        value={item.name}
                        onChange={(e: any) => setName(e.target.value)}
                        onClick={onClickHandler}
                        onTouchStart={onClickHandler}
                        onBlur={onBlurHandler} />
                )
            case progress.summary:
                return (
                    <DataSummary
                        item={item}
                        base64={base64} />
                )
            default: return null;
        }
    }


    /**
     * useEffect
     * 
     * Hibaüzenet megjelenítése
     */
    useEffect(() => {
        if (error.length === 0) return;

        message(error);
    }, [error]);


    /**
     * useEffect
     * 
     * A kiválasztott kép útvonalának vizsgálata
     */
    useEffect(() => {
        if (item.image.length === 0) return;

        if (typeof item.image !== 'string') {
            setError("A megadott útvonal érvénytelen.");
            return;
        }

        createBase64string();
    }, [item.image]);


    /**
     * Effect
     * 
     */
    useEffect(() => {
        return () => {
            resetValue();
        }
    }, []);


    /**
     * Effect
     * 
     */
    useEffect(() => {
        setName(inputValue);
    }, [inputValue]);


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

export default DataEditor;
