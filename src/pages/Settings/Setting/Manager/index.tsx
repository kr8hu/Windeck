//React
import { ReactNode, useEffect } from 'react';

//Hooks
import useGamepad from '../../../../hooks/useGamepad';

//Components
import DataEditor from './DataEditor';

//Layout
import MainLayout from '../../../../layouts/MainLayout';

//Local
import menuItems from './menuItems';

//Shared
import { gamepadButtons } from '../../../../shared/const';

//Interfaces
import IGamepadLayout from '../../../../interfaces/GamepadLayout';

//Styles
import styles from './Manager.module.css';


/**
 * Manager
 * 
 * @returns 
 */
function Manager(): ReactNode {
    /**
     * Hooks
     * 
     */
    const gamepad = useGamepad();


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
     * useEffect
     * 
     * Gombkiosztás alkalmazása komponsens mountolásakor
     */
    useEffect(() => {
        setGamepadLayout();
    }, []);


    return (
        <MainLayout menuItems={menuItems}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <DataEditor />
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Manager;
