//React
import React, { useEffect } from 'react';

//React Router
import { useLocation } from 'react-router-dom';

//Hooks
import useGamepad from '../../../../../hooks/useGamepad';

//Layouts
import MainLayout from '../../../../../layouts/MainLayout';

//Shared
import { gamepadButtons } from '../../../../../shared/const';

//Local
import menuItems from './menuItems';

//Interfaces
import IGamepadLayout from '../../../../../interfaces/GamepadLayout';

//Styles
import styles from './License.module.css';


/**
 * License
 * 
 * @returns 
 */
function License(): React.ReactNode {
    /**
     * Hooks
     * 
     */
    const gamepad = useGamepad();
    const location = useLocation();


    /**
     * setGamepadLayout
     * 
     */
    const setGamepadLayout = () => {
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
     */
    useEffect(() => {
        setGamepadLayout();
    }, []);


    return (
        <MainLayout menuItems={menuItems}>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <h1 className={styles.title}>
                        {location.state.name}
                    </h1>

                    <p className={styles.text}>
                        {location.state.license}
                    </p>
                </div>
            </div>
        </MainLayout>
    )
}

export default License;
