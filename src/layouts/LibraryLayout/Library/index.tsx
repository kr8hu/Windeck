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

//Styles
import styles from './Library.module.css';


let navigateTimeout: any;
let gamepadIndex: any;

const sensitivity = 100;


/**
 * Library
 * 
 * @returns 
 */
function Library() {
    //Context
    const { appState, setAppState } = useContext(AppContext);


    //States
    const [activeIndex, setActiveIndex] = useState<number>(0);

    
    //Hooks
    const navigate = useNavigate();
    const [playClickSound] = useSound(clickSound);


    useEffect(() => {
        document.addEventListener('contextmenu', (e: any) => {
            e.preventDefault();
        });

        window.addEventListener('keydown', (e: any) => {
            onKeyPress(e.keyCode);
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
                            onButtonPress(buttonIndex);
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


    /**
     * Elemek közti váltáskor smooth scroll alkalmazása
     */
    useEffect(() => {
        const elem = document.querySelector(`.library-item-${activeIndex}`);

        elem?.scrollIntoView({
            behavior: 'smooth'
        });

        playClickSound();
    }, [activeIndex]);


    /**
     * Elemek közti váltáskor activeIndex kezelése
     */
    useEffect(() => {
        if (activeIndex < 0) {
            setActiveIndex(appState.library.length - 1);
            return;
        }

        if (activeIndex > appState.library.length - 1) {
            setActiveIndex(0);
            return;
        }

        setAppState(actionTypes.app.SET_SELECTED, activeIndex);
    }, [activeIndex, appState.library]);


    /**
     * openPage
     * 
     * Oldal megnyitására szolgáló funkció
     * (TO-DO: megoldást találni a timeout elhagyására)
     */
    const openPage = (route: string, state?: any) => {
        clearTimeout(navigateTimeout);

        navigateTimeout = setTimeout(() => {
            navigate(route, {
                state: state || undefined
            });
        }, 750);
    }


    /**
     * onKeyPress
     * 
     * @param keyCode
     * @returns 
     */
    const onKeyPress = (keyCode: number) => {
        switch (keyCode) {
            case KEYBOARD_BUTTONS.left: {
                setActiveIndex((current: number) => current - 1);
                break;
            }
            case KEYBOARD_BUTTONS.right: {
                setActiveIndex((current: number) => current + 1);
                break;
            }
            case KEYBOARD_BUTTONS.rshift: {
                openPage('/settings');
                break;
            }
            case KEYBOARD_BUTTONS.F1: {
                setActiveIndex(0);
                break;
            }
            case KEYBOARD_BUTTONS.F12: {
                setActiveIndex(appState.library.length - 1)
                break;
            }
            case KEYBOARD_BUTTONS.esc: {
                openPage("/exit");
                break;
            }
            default: return null;
        }
    }


    /**
     * onButtonPress
     * 
     * @param buttonactiveIndex 
     */
    const onButtonPress = (buttonactiveIndex: any) => {
        switch (buttonactiveIndex) {
            case GAMEPAD_BUTTONS.left: {
                setActiveIndex((current: number) => current - 1);
                break;
            }
            case GAMEPAD_BUTTONS.right: {
                setActiveIndex((current: number) => current + 1);
                break;
            }
            case GAMEPAD_BUTTONS.L1: {
                setActiveIndex(0);
                break;
            }
            case GAMEPAD_BUTTONS.R1: {
                setActiveIndex(appState.library.length - 1);
                break;
            }
            case GAMEPAD_BUTTONS.Y: {
                openPage("/settings");
                break;
            }
            case GAMEPAD_BUTTONS.options: {
                openPage("/exit");
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
                                    selected={idx === activeIndex ? true : false}
                                    path={item.path} />
                            )
                        })}
                </div>
            </div>
        </div>
    )
}

export default Library;
