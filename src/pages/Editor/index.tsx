//React
import {
    useState,
    useEffect,
    ReactNode
} from 'react';

//Hooks
import useApp from '../../hooks/useApp';
import useInput from '../../hooks/useInput';

//Router
import { useLocation, useNavigate } from 'react-router-dom';

//Hooks
import useGamepad from '../../hooks/useGamepad';

//Tauri
import {
    confirm,
    message
} from '@tauri-apps/plugin-dialog';
//import { open } from '@tauri-apps/plugin-shell';

//Components
import Image from '../../components/Image';
import Button from '../../components/Button';

//Layout
import MainLayout from '../../layouts/MainLayout';

//Local
import menuItems from './menuItems';

//Shared
import {
    actionTypes,
    gamepadButtons,
    /* touchKeyboardLocation */
} from '../../shared/const';

//Assets
import placeholderImage from '../../assets/images/placeholder.jpg';

//Interfaces
import IGamepadLayout from '../../interfaces/GamepadLayout';

//Styles
import styles from './Editor.module.css';


/**
 * IInputFields
 * 
 */
interface IInputFields {
    readOnly: boolean;
    title: string;
    value: any;
    onChange: (e: any) => any;
}


/**
 * Editor
 * 
 * @returns 
 */
function Editor(): ReactNode {
    /**
     * Hooks
     * 
     */
    const { appState, setAppState } = useApp();
    const { inputValue, setValue, resetValue } = useInput();


    /**
     * Hooks
     * 
     */
    const navigate = useNavigate();
    const gamepad = useGamepad();


    /**
     * States
     * 
     */
    const [name, setName] = useState<string>("");
    const [path, setPath] = useState<string>("");


    /**
     * inputFields
     * 
     */
    const inputFields: IInputFields[] = [
        {
            readOnly: false,
            title: "Név",
            value: name,
            onChange: (e: any) => setName(e.target.value)
        },
        {
            readOnly: true,
            title: "Elérési útvonal",
            value: path,
            onChange: (e: any) => setPath(e.target.value)
        }
    ];


    /**
     * setGamepadLayout
     * 
     */
    const setGamepadLayout = (): void => {
        const gamepadLayout: IGamepadLayout[] = [
            {
                name: "Vissza",
                button: gamepadButtons.B,
                route: -1,
                state: undefined,
                function: undefined,
                visibility: true
            },
        ];

        gamepad.setLayout(gamepadLayout);
    }


    /**
     * modifyItem
     * 
     * Elem módosítása
     */
    const modifyItem = (): void => {
        setAppState(actionTypes.app.MODIFY_LIBRARY_ITEM, {
            id: appState.selected,
            image: appState.library[appState.selected].image,
            path,
            name: name,
        });

        message("A módosítások végrehajtva.", { kind: 'info' });
    }


    /**
     * deleteItem
     * 
     * Elem törlése
     */
    const deleteItem = (): void => {
        confirm('Biztosan törölni szeretnéd a kijelölt elemet?', { kind: 'warning' })
            .then((res: boolean) => {
                if (res === true) {
                    setAppState(actionTypes.app.DELETE_LIBRARY_ITEM, appState.selected);
                    navigate(-1);
                }
            });
    }


    /**
     * renderInputFields
     * 
     */
    const renderInputFields = (): ReactNode => {
        return inputFields.map((input: any) => {
            return (
                <>
                    <span className={styles.heading}>
                        {input.title}
                    </span>
                    <input
                        className={styles.input}
                        value={input.value}
                        readOnly={input.readOnly}
                        onChange={input.onChange}
                        onClick={onClickHandler} />
                </>
            )
        });
    }


    /**
     * onClickHandler
     * 
     */
    const onClickHandler = (): void => {
        setAppState(actionTypes.app.SET_KEYBOARD, true);
    }


    /**
     * useEffect
     * 
     * Gombkiosztás alkalmazása komponsens mountolásakor
     */
    useEffect(() => {
        setGamepadLayout();

        return () => {
            resetValue();
        }
    }, []);


    /**
     * useEffect
     * 
     * Törlés esetén undefined hibák elkerülése
     */
    useEffect(() => {
        setName(appState.library[appState.selected].name);
        setPath(appState.library[appState.selected].location);
        setValue(appState.library[appState.selected].name)
    }, [appState.library]);


    /**
     * useEffect
     * 
     */
    useEffect(() => {
        setName(inputValue);
    }, [inputValue]);


    return (
        <MainLayout menuItems={menuItems}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <span className={styles.heading}>
                            Borítókép
                        </span>
                        <Image
                            className={styles.picture}
                            src={appState.library[appState.selected].image}
                            placeholder={placeholderImage} />
                    </div>

                    <div className={styles.col}>
                        {/* Beviteli mezők */}
                        {renderInputFields()}

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
        </MainLayout>
    )
}

export default Editor;
