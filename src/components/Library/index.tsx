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


/**
 * Library
 * 
 * Játékkönyvtár komponens
 * 
 * @returns 
 */
function Library() {
    //Router
    const navigator = useNavigate();

    //Context
    const { appState, setAppState } = useContext(AppContext);
    const { setGamepadState } = useContext(GamepadContext);

    //State
    const [index, setIndex] = useState<number>(0);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [execStatus, setExecStatus] = useState<boolean>(false);

    //Hooks
    const [playClickSound] = useSound(clickSound);
    const [playStartSound] = useSound(startSound);


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
            key: GAMEPAD_KEYS.A,
            action: () => setExecStatus(true)
        },
        {
            key: GAMEPAD_KEYS.options,
            action: () => exit()
        }
    ];


    //Keymap alkalmazása
    useEffect(() => {
        setGamepadState(actionTypes.gamepad.SET_KEYMAP, keymap);
        //document.addEventListener('contextmenu', event => event.preventDefault());
    }, []);


    //execStatus és selectedIndex hatása a komponensre
    useEffect(() => {
        //Ha engedélyezett a launch
        if (execStatus) {
            handleExecutable(selectedIndex);
        }

        setExecStatus(false);
    }, [execStatus, selectedIndex]);


    //index és az appState.library hatása a komponensre
    useEffect(() => {
        //Ha az index kisebb mint nulla a sor végére dobjuk a kijelölést
        if (index < 0) {
            setIndex(appState.library.length - 1);
            return;
        }

        //Ha nagyobb az index mint a könyvtár utolsó elemének indexe, a sor elejére dobjuk a kijelölést
        if (index > appState.library.length - 1) {
            setIndex(0)
            return;
        }

        //Hang lejátszása
        playClickSound();

        //HTML elem meghatározása
        const elem = document.querySelector(`.library-item-${index}`);

        //Smooth scroll effektus alkalmazása
        elem?.scrollIntoView({
            behavior: 'smooth'
        });

        //Tároljuk a storeban az aktuális kijelölt elem indexét
        setAppState(actionTypes.app.SET_SELECTED, index);
    }, [index, appState.library]);


    /**
     * handleExecutable
     * 
     * Navigáció a program indító képernyőre
     */
    const handleExecutable = (id: number) => {
        //Function spam fix
        clearTimeout(executeTimer);

        //Multiple button press fix
        setGamepadState(actionTypes.gamepad.SET_PRESSED, -1);

        //Hang lejátszása
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
     * render
     * 
     * Tartalom renderelése
     */
    const render = () => {
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
                    {render()}
                </div>

                <span className={styles.name}>
                    {appState.library[appState.selected].name}
                </span>
            </div>
        </div>
    )
}

export default Library;
