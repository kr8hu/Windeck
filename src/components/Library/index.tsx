//React
import React, {
    useEffect,
    useContext,
    useState
} from 'react';

//useSound
import useSound from 'use-sound';

//Router
import { useNavigate } from 'react-router-dom';

//Context
import { AppContext } from '../../context/App';

//Components
import LibraryItem from './LibraryItem';

//Shared
import {
    GAMEPAD_KEYS,
    KEYBOARD_KEYS,
    actionTypes
} from '../../shared/const';
import { sortByProperty } from '../../shared/utils';

//Assets
import clickSound from '../../assets/sounds/click_03.mp3';
import startSound from '../../assets/sounds/start_02.mp3';

//Styles
import styles from './Library.module.css';


let executeTimer: any;
let gamepadIndex: any;

const sensitivity = 100;


/**
 * Library
 * 
 * Játékkönyvtár komponens
 * 
 * @returns 
 */
function Library() {
    //Router
    const navigate = useNavigate();

    //Context
    const { appState, setAppState } = useContext(AppContext);

    //State
    const [index, setIndex] = useState<number>(0);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [execStatus, setExecStatus] = useState<boolean>(false);

    //Hooks
    const [playClickSound] = useSound(clickSound);
    const [playStartSound] = useSound(startSound);


    useEffect(() => {
        //document.addEventListener('contextmenu', event => event.preventDefault());

        //Billentyűzetkiosztás felvétele
        window.addEventListener('keydown', (e: any) => {
            setKeyboardLayout(e.keyCode);
        });

        //Kontroller gombkiosztás felvétele
        window.addEventListener('gamepadconnected', (e: any) => {
            return gamepadIndex = e.gamepad.index;
        });

        setInterval(() => {
            if (gamepadIndex !== undefined) {
                const gamepad: any = navigator.getGamepads()[gamepadIndex];

                gamepad.buttons.map((e: any) => e.pressed).forEach((isPressed: any, buttonIndex: any) => {
                    if (isPressed) {
                        setControllerLayout(buttonIndex);
                    }
                });
            }
        }, sensitivity);


        return () => {
            window.removeEventListener('keydown', () => { });
            window.removeEventListener('gamepadconnected', () => { });
        }
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

        //Tároljuk a storeban a kijelölt elem indexét
        setAppState(actionTypes.app.SET_SELECTED, index);
    }, [index, appState.library]);


    /**
     * setKeyboardLayout
     * 
     * Billentyűzetkiosztás alkalmazása
     * 
     * @param keyCode Lenyomott billentyű azonosítója
     * @returns 
     */
    const setKeyboardLayout = (keyCode: number) => {
        switch (keyCode) {
            case KEYBOARD_KEYS.left: {
                setIndex((current: number) => current - 1);
                break;
            }
            case KEYBOARD_KEYS.right: {
                setIndex((current: number) => current + 1);
                break;
            }
            case KEYBOARD_KEYS.F1: {
                setIndex(0);
                break;
            }
            case KEYBOARD_KEYS.F12: {
                setIndex(appState.library.length - 1)
                break;
            }
            case KEYBOARD_KEYS.enter: {
                setExecStatus(true);
                break;
            }
            case KEYBOARD_KEYS.esc: {
                navigate("/exit");
                break;
            }
            default: return null;
        }
    }


    /**
     * setControllerLayout
     * 
     * Kontroller gombkiosztás alkalmazása
     * 
     * @param buttonIndex lenyomott gomb azonosítója
     */
    const setControllerLayout = (buttonIndex: number) => {
        switch (buttonIndex) {
            case GAMEPAD_KEYS.left: {
                setIndex((current: number) => current - 1);
                break;
            }
            case GAMEPAD_KEYS.right: {
                setIndex((current: number) => current + 1);
                break;
            }
            case GAMEPAD_KEYS.L1: {
                setIndex(0);
                break;
            }
            case GAMEPAD_KEYS.R1: {
                setIndex(appState.library.length - 1)
                break;
            }
            case GAMEPAD_KEYS.A: {
                setExecStatus(true);
                break;
            }
            case GAMEPAD_KEYS.options: {
                navigate("/exit");
                break;
            }
            default: return null;
        }
    }


    /**
     * handleExecutable
     * 
     * Navigáció a program indító képernyőre
     */
    const handleExecutable = (id: number) => {
        //Function spam fix
        clearTimeout(executeTimer);

        //Hang lejátszása
        playStartSound();

        executeTimer = setTimeout(() => {
            navigate('/launch', {
                state: {
                    path: appState.library[id].path
                }
            });
        }, 1500);
    }


    return (
        <div className={styles.container}>
            <div className={styles.col}>
                <div className={styles.wrapper}>
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
                </div>

                <span className={styles.name}>
                    {appState.library[appState.selected].name}
                </span>
            </div>
        </div>
    )
}

export default Library;
