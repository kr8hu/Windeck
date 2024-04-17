//React
import {
    useEffect,
    useContext,
    useState
} from 'react';

//Hooks
import useSound from 'use-sound';
import { useNavigate } from 'react-router-dom';

//Context
import { AppContext } from '../../../context/App';

//Components
import LibraryItem from './LibraryItem';

//Shared
import {
    gamepadButtons,
    actionTypes
} from '../../../shared/const';
import { sortByProperty } from '../../../shared/utils';

//Assets
import clickSound from '../../../assets/sounds/click_03.mp3';

//Types
import ILibraryItem from '../../../interfaces/LibraryItem';

//Styles
import styles from './Library.module.css';


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
    const [playClickSound] = useSound(clickSound);
    const navigate = useNavigate();


    useEffect(() => {
        setGamepadLayout();
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
     * setGamepadLayout
     * 
     */
    const setGamepadLayout = () => {
        const gamepadLayout = [
            {
                button: gamepadButtons.LEFT,
                route: undefined,
                state: undefined,
                function: () => setActiveIndex((current: number) => current - 1)
            },
            {
                button: gamepadButtons.RIGHT,
                route: undefined,
                state: undefined,
                function: () => setActiveIndex((current: number) => current + 1)
            },
            {
                button: gamepadButtons.L1,
                route: undefined,
                state: undefined,
                function: () => setActiveIndex(0)
            },
            {
                button: gamepadButtons.R1,
                route: undefined,
                state: undefined,
                function: () => setActiveIndex(appState.library.length - 1)
            },
            {
                button: gamepadButtons.A,
                route: "/launch",
                state: undefined,
                function: undefined
            },
            {
                button: gamepadButtons.X,
                route: "/editor",
                state: undefined,
                function: undefined
            },
            {
                button: gamepadButtons.Y,
                route: "/settings",
                state: undefined,
                function: undefined
            },
            {
                button: gamepadButtons.OPTIONS,
                route: "/exit",
                state: undefined,
                function: undefined
            }
        ];

        //Gamepad Layout
        setAppState(actionTypes.app.SET_GAMEPAD_LAYOUT, gamepadLayout);
    }


    /**
     * onLibraryItemClickHandler
     * 
     * @param index 
     */
    const onLibraryItemClickHandler = (index: number) => {
        setActiveIndex(index);

        setTimeout(() => {
            navigate("/launch");
        }, 750);
    }


    return (
        <div className={styles.container}>
            <div className={styles.col}>
                <div className={styles.wrapper}>
                    {appState.library.sort(sortByProperty('name'))
                        .map((item: ILibraryItem, idx: number) => {
                            return (
                                <LibraryItem
                                    className={`library-item-${idx}`}
                                    key={idx}
                                    id={idx}
                                    image={item.image}
                                    name={item.name}
                                    selected={idx === activeIndex ? true : false}
                                    path={item.path}
                                    onClick={(index: number) => onLibraryItemClickHandler(index)} />
                            )
                        })}
                </div>
            </div>
        </div>
    )
}

export default Library;
