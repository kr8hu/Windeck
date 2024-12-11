//React
import {
    useEffect,
    useContext,
    useState
} from 'react';

//React Router
import { useNavigate } from 'react-router-dom';

//Hooks
import useSound from 'use-sound';
import useGamepad from '../../../hooks/useGamepad';

//Context
import { AppContext } from '../../../context/App';

//Components
import LibraryItem from './LibraryItem';

//Shared
import {
    gamepadButtons,
    actionTypes,
} from '../../../shared/const';
import { sortByProperty } from '../../../shared/utils';

//Assets
import clickSound from '../../../assets/sounds/click_03.mp3';

//Interfaces
import ILibraryItem from '../../../interfaces/LibraryItem';
import IGamepadLayout from '../../../interfaces/GamepadLayout';

//Styles
import styles from './Library.module.css';


/**
 * Library
 * 
 * @returns 
 */
function Library() {
    /**
     * Context
     */
    const { appState, setAppState } = useContext(AppContext);


    /**
     * States
     * 
     */
    const [activeIndex, setActiveIndex] = useState<number>(0);


    /**
     * Hooks
     * 
     */
    const gamepad = useGamepad();
    const navigate = useNavigate();
    const [playClickSound] = useSound(clickSound);


    /**
     * setGamepadLayout
     * 
     */
    const setGamepadLayout = () => {
        const gamepadLayout: IGamepadLayout[] = [
            {
                name: "Előző",
                button: gamepadButtons.LEFT,
                route: undefined,
                state: undefined,
                function: () => setActiveIndex((current: number) => current - 1),
                visibility: true
            },
            {
                name: "Következő",
                button: gamepadButtons.RIGHT,
                route: undefined,
                state: undefined,
                function: () => setActiveIndex((current: number) => current + 1),
                visibility: true
            },
            {
                name: "Első",
                button: gamepadButtons.L1,
                route: undefined,
                state: undefined,
                function: () => setActiveIndex(0),
                visibility: false
            },
            {
                name: "Utolsó",
                button: gamepadButtons.R1,
                route: undefined,
                state: undefined,
                function: () => setActiveIndex(appState.library.length - 1),
                visibility: false
            },
            {
                name: "Indítás",
                button: gamepadButtons.A,
                route: "/launch",
                state: undefined,
                function: undefined,
                visibility: true
            },
            {
                name: "Szerkesztés",
                button: gamepadButtons.X,
                route: "/editor",
                state: undefined,
                function: undefined,
                visibility: true
            },
            {
                name: "Beállítások",
                button: gamepadButtons.Y,
                route: "/settings",
                state: undefined,
                function: undefined
            },
            {
                name: "Kilépés",
                button: gamepadButtons.OPTIONS,
                route: "/exit",
                state: undefined,
                function: undefined
            }
        ];

        gamepad.setLayout(gamepadLayout);
    }


    /**
     * onClickHandler
     * 
     * @param index 
     */
    const onClickHandler = (index: number) => {
        setActiveIndex(index);

        setTimeout(() => {
            navigate("/launch");
        }, 750);
    }


    /**
     * renderLibraryItems
     * 
     * Könyvtár elemeinek renderelése
     * @returns 
     */
    const renderLibraryItems = () => {
        const sortedLibraryItems = appState.library.sort(sortByProperty('name'));

        return sortedLibraryItems.map((item: ILibraryItem, idx: number) => {
            return (
                <LibraryItem
                    key={idx}
                    id={idx}
                    name={item.name}
                    image={item.image}
                    location={item.location}
                    className={`library-item-${idx}`}
                    selected={idx === activeIndex ? true : false}
                    onClick={onClickHandler} />
            )
        })
    }


    /**
     * useEffect
     * 
     * Gamepad gombkiosztás a komponens mountolásakor
     */
    useEffect(() => {
        setGamepadLayout();
    }, []);


    /**
     * useEffect
     * 
     * Elemek közti váltáskor smooth scroll alkalmazása activeIndex változásakor
     */
    useEffect(() => {
        const elem = document.querySelector(`.library-item-${activeIndex}`);

        elem?.scrollIntoView({
            behavior: 'smooth'
        });

        playClickSound();
    }, [activeIndex]);


    /**
     * useEffect
     * 
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


    return (
        <div className={styles.container}>
            <div className={styles.col}>
                <div className={styles.wrapper}>
                    {renderLibraryItems()}
                </div>
            </div>
        </div>
    )
}

export default Library;
