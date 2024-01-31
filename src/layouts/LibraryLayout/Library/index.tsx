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
import { AppContext } from '../../../context/App';

//Components
import LibraryItem from './LibraryItem';

//Shared
import {
    GAMEPAD_BUTTONS,
    KEYBOARD_BUTTONS,
    actionTypes
} from '../../../shared/const';
import { sortByProperty } from '../../../shared/utils';

//Assets
import clickSound from '../../../assets/sounds/click_03.mp3';
//import startSound from '../../../assets/sounds/start_02.mp3';

//Styles
import styles from './Library.module.css';


let navigateTimeout: any;
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
    const [, setSelectedIndex] = useState<number>(0);
    const [execStatus, setExecStatus] = useState<boolean>(false);

    //Hooks
    const [playClickSound] = useSound(clickSound);
//    const [playStartSound] = useSound(startSound);


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

                gamepad.buttons.map((e: any) => e.pressed)
                    .forEach((isPressed: any, buttonIndex: any) => {
                        if (isPressed) {
                            setGamepadLayout(buttonIndex);
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
            const data = {
                path: appState.library[appState.selected].path
            };

            handleNavigation("/launch", data);
        }

        setExecStatus(false);
    }, [execStatus]);


    /**
     * handleNavigation
     * 
     * Navigáció kezelése
     */
    const handleNavigation = (route: string, state?: any) => {
        clearTimeout(navigateTimeout);

        navigateTimeout = setTimeout(() => {
            navigate(route, {
                state: state || undefined
            });
        }, 750);
    }


    /**
     * setKeyboardLayout
     * 
     * Billentyűzetkiosztás alkalmazása
     * 
     * @param keyCode
     * @returns 
     */
    const setKeyboardLayout = (keyCode: number) => {
        switch (keyCode) {
            case KEYBOARD_BUTTONS.left: {
                setIndex((current: number) => current - 1);
                break;
            }
            case KEYBOARD_BUTTONS.right: {
                setIndex((current: number) => current + 1);
                break;
            }
            case KEYBOARD_BUTTONS.rshift: {
                handleNavigation('/settings');
                break;
            }
            case KEYBOARD_BUTTONS.F1: {
                setIndex(0);
                break;
            }
            case KEYBOARD_BUTTONS.F12: {
                setIndex(appState.library.length - 1)
                break;
            }
            case KEYBOARD_BUTTONS.enter: {
                setExecStatus(true);
                break;
            }
            case KEYBOARD_BUTTONS.esc: {
                handleNavigation("/exit");
                break;
            }
            default: return null;
        }
    }


    /**
     * setGamepadLayout
     * 
     * Kontroller gombkiosztás alkalmazása
     * 
     * @param buttonIndex 
     */
    const setGamepadLayout = (buttonIndex: any) => {
        switch (buttonIndex) {
            case GAMEPAD_BUTTONS.left: {
                setIndex((current: number) => current - 1);
                break;
            }
            case GAMEPAD_BUTTONS.right: {
                setIndex((current: number) => current + 1);
                break;
            }
            case GAMEPAD_BUTTONS.L1: {
                setIndex(0);
                break;
            }
            case GAMEPAD_BUTTONS.R1: {
                setIndex(appState.library.length - 1);
                break;
            }
            case GAMEPAD_BUTTONS.A: {
                setExecStatus(true);
                break;
            }
            case GAMEPAD_BUTTONS.Y: {
                handleNavigation("/settings");
                break;
            }
            case GAMEPAD_BUTTONS.options: {
                handleNavigation("/exit");
                break;
            }
            default: return null;
        }
    }


    return (
        <div className={styles.container}>
            <div className={styles.col}>
                <div className={styles.wrapper}>
                    {appState.library.sort(sortByProperty('name'))
                        .map((item: any, idx: number) => {
                            return (
                                <LibraryItem
                                    className={`library-item-${idx}`}
                                    key={idx}
                                    id={idx}
                                    image={item.image}
                                    name={item.name}
                                    selected={idx === index ? true : false}
                                    path={item.path}
                                    onChange={setSelectedIndex} />
                            )
                        })}
                </div>
            </div>
        </div>
    )
}

export default Library;
