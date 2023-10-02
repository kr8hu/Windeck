//React
import React, {
    useEffect,
    useContext,
    useState
} from 'react';

//useSound
import useSound from 'use-sound';

//Tauri
import { exit } from '@tauri-apps/api/process';

//Router
import { useNavigate } from 'react-router-dom';

//Context
import { AppContext } from '../../context/App';
import { GamepadContext } from '../../context/Gamepad';

//Components
import LibraryItem from './LibraryItem';

//Shared
import {
    GAMEPAD_KEYS,
    actionTypes
} from '../../shared/const';
import { sortByProperty } from '../../shared/utils';

//Assets
import clickSound from '../../assets/sounds/click_03.mp3';
import startSound from '../../assets/sounds/start_02.mp3';

//Styles
import styles from './Library.module.css';


let executeTimer: any;


function Library() {
    //Router
    const navigator = useNavigate();

    //Sound
    const [playClickSound] = useSound(clickSound);
    const [playStartSound] = useSound(startSound);

    //Context
    const { appState, setAppState } = useContext(AppContext);
    const { setGamepadState } = useContext(GamepadContext);

    //State
    const [index, setIndex] = useState<number>(0);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [execStatus, setExecStatus] = useState<boolean>(false);


    //Controller keymap
    const keymap = [
        {
            key: GAMEPAD_KEYS.left,
            action: () => setIndex((current: number) => current - 1)
        },
        {
            key: GAMEPAD_KEYS.right,
            action: () => setIndex((current: number) => current + 1)
        },
        {
            key: GAMEPAD_KEYS.L1,
            action: () => setIndex(0)
        },
        {
            key: GAMEPAD_KEYS.R1,
            action: () => setIndex(appState.library.length - 1)
        },
        {
            key: GAMEPAD_KEYS.cross,
            action: () => setExecStatus(true)
        },
        {
            key: GAMEPAD_KEYS.options,
            action: () => exit()
        }
    ];


    //Keymap beállítása
    useEffect(() => {
        setGamepadState(actionTypes.gamepad.SET_KEYMAP, keymap);
        //document.addEventListener('contextmenu', event => event.preventDefault());
    }, []);


    //Execute status
    useEffect(() => {
        //Ha engedélyezett a launch
        if (execStatus) {
            handleExecutable(selectedIndex);
        }

        setExecStatus(false);
    }, [execStatus, selectedIndex])


    //Elem léptetése és hibakezelés
    useEffect(() => {
        if (index < 0) {
            setIndex(appState.library.length - 1);
            return;
        }

        if (index > appState.library.length - 1) {
            setIndex(0)
            return;
        }

        playClickSound();

        const elem = document.querySelector(`.library-item-${index}`);
        elem?.scrollIntoView({
            behavior: 'smooth'
        });

        setAppState(actionTypes.app.SET_SELECTED, index);
    }, [index, appState.library]);


    /**
     * Futtatás
     */
    const handleExecutable = (id: number) => {
        //Function spam fix
        clearTimeout(executeTimer);

        //Multiple button press fix
        setGamepadState(actionTypes.gamepad.SET_PRESSED, -1);

        playStartSound();

        executeTimer = setTimeout(() => {
            navigator('/launch', {
                state: {
                    path: appState.library[id].path
                }
            });
        }, 1500);
    }


    /**
     * Tartalom renderelése
     */
    const renderLibrary = () => {
        //Fő elem renderelése
        return (
            <React.Fragment>
                {appState.library.sort(sortByProperty('name')).map((item: any, idx: number) => {
                    return (
                        <LibraryItem
                            key={idx}
                            id={idx}
                            className={`library-item-${idx}`}
                            name={item.name}
                            image={item.image}
                            selected={idx === index ? true : false}
                            onChange={setSelectedIndex} />
                    )
                })}
            </React.Fragment>
        )
    }


    return (
        <div className={styles.container}>
            <div className={styles.col}>
                <div className={styles.wrapper}>
                    {renderLibrary()}
                </div>

                <span className={styles.name}>
                    {appState.library[appState.selected].name}
                </span>
            </div>
        </div>
    )
}

export default Library;
