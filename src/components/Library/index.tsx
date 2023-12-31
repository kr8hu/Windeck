//React
import {
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

//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLock,
    faUnlock
} from '@fortawesome/free-solid-svg-icons';

//Styles
import styles from './Library.module.css';


let executeTimeout: any;
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
        document.addEventListener('contextmenu', (e: any) => {
            e.preventDefault();
        });

        window.addEventListener('keydown', (e: any) => {
            setKeyboardLayout(e.keyCode);
        });

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
            window.removeEventListener('contextmenu', () => { });
            window.removeEventListener('gamepadconnected', () => { });
        }
    }, []);


    //index változásának hatása a komponensre
    useEffect(() => {
        const elem = document.querySelector(`.library-item-${index}`);

        elem?.scrollIntoView({
            behavior: 'smooth'
        });

        playClickSound();
    }, [index]);


    //index és az appState.library hatása a komponensre
    useEffect(() => {
        if (index < 0) {
            setIndex(appState.library.length - 1);
            return;
        }

        if (index > appState.library.length - 1) {
            setIndex(0);
            return;
        }

        setAppState(actionTypes.app.SET_SELECTED, index);
    }, [index, appState.library]);


    //execStatus és selectedIndex hatása a komponensre
    useEffect(() => {
        if (execStatus) {
            handleExecutable(selectedIndex);
        }

        setExecStatus(false);
    }, [execStatus, selectedIndex]);


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
    const setControllerLayout = (buttonIndex: any) => {

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
     * setLockStatus
     * 
     * Zárolást módosító funkció
     */
    const setLockStatus = () => {
        setAppState(actionTypes.app.SET_LOCKED, !appState.locked);
    }


    /**
     * handleExecutable
     * 
     * Navigáció a program indító képernyőre
     */
    const handleExecutable = (id: number) => {
        clearTimeout(executeTimeout);
        playStartSound();

        executeTimeout = setTimeout(() => {
            navigate('/launch', {
                state: {
                    path: appState.library[id].path
                }
            });
        }, 1500);
    }


    return (
        <div className={styles.container}>
            <div className={styles.status} onClick={setLockStatus}>
                <FontAwesomeIcon icon={appState.locked ? faLock : faUnlock} />
            </div>
            <div className={styles.col}>
                <div className={styles.wrapper}>
                    {appState.library.sort(sortByProperty('name'))
                        .map((item: any, idx: number) => {
                            return (
                                <LibraryItem
                                    key={idx}
                                    id={idx}
                                    className={`library-item-${idx}`}
                                    name={item.name}
                                    image={item.image}
                                    selected={idx === index ? true : false}
                                    path={item.path}
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
