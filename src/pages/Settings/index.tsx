//React
import { 
    ReactNode,
    useEffect, 
    useState 
} from 'react';

//Hooks
import useGamepad from '../../hooks/useGamepad';

//Components
import Setting from './Setting';

//Layout
import MainLayout from '../../layouts/MainLayout';

//Local
import settings from './settings';
import menuItems from './menuItems';

//Shared
import { gamepadButtons } from '../../shared/const';

//Interfaces
import IGamepadLayout from '../../interfaces/GamepadLayout';

//Styles
import styles from './Settings.module.css';


/**
 * Settings
 * 
 * @returns 
 */
function Settings(): ReactNode {
    /**
     * Hooks
     * 
     */
    const gamepad = useGamepad();


    /**
     * States
     * 
     */
    const [activeIndex, setActiveIndex] = useState<number>(0);


    /**
     * setGamepadLayout
     * 
     */
    const setGamepadLayout = (idx: number): void => {
        const gamepadLayout: IGamepadLayout[] = [
            {
                name: "Vissza",
                button: gamepadButtons.B,
                route: -1,
                state: undefined,
                function: undefined,
                visibility: true
            },
            {
                name: "Megnyitás",
                button: gamepadButtons.A,
                route: settings[idx].path,
                state: undefined,
                function: undefined,
                visibility: true
            },
            {
                name: "Irányítás",
                button: gamepadButtons.DIRECTIONS,
                route: undefined,
                state: undefined,
                function: undefined,
                visibility: true
            },
            {
                name: "Előző",
                button: gamepadButtons.LEFT,
                route: undefined,
                state: undefined,
                function: () => setActiveIndex(idx - 1),
                visibility: false
            },
            {
                name: "Következő",
                button: gamepadButtons.RIGHT,
                route: undefined,
                state: undefined,
                function: () => setActiveIndex(idx + 1),
                visibility: false
            },
            {
                name: "Fel",
                button: gamepadButtons.UP,
                route: undefined,
                state: undefined,
                function: () => {
                    if(idx > 4) {
                        setActiveIndex(idx - 4);
                    }
                },
                visibility: false
            },
            {
                name: "Le",
                button: gamepadButtons.DOWN,
                route: undefined,
                state: undefined,
                function: () => {
                    if(idx <= 4) {
                        setActiveIndex(idx + 4);
                    }
                },
                visibility: false
            },
        ];

        gamepad.setLayout(gamepadLayout);
    }


    /**
     * renderSettings
     * 
     * @returns 
     */
    const renderSettings = (): ReactNode => {
        return settings.map((setting: any, idx: number) => {
            return (
                <div
                    key={idx}
                    className={styles.col}
                    data-selected={idx === activeIndex}
                    onClick={() => setActiveIndex(idx)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    style={{
                        width: `calc(100% / 2)`
                    }}>
                    <Setting data={setting} />
                </div>
            )
        })
    }
    

    /**
     * useEffect
     * 
     * Elemek közti váltáskor activeIndex kezelése
     */
    useEffect(() => {
        if (activeIndex < 0) {
            setActiveIndex(settings.length - 1);
            return;
        }

        if (activeIndex > settings.length - 1) {
            setActiveIndex(0);
            return;
        }
        
        setGamepadLayout(activeIndex);
    }, [activeIndex]);


    return (
        <MainLayout menuItems={menuItems}>
            <div className={styles.container}>
                <div className={styles.row}>
                    {renderSettings()}
                </div>
            </div>
        </MainLayout>
    )
}


export default Settings;
