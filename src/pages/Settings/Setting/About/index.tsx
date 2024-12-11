//React
import React, { useEffect } from 'react';

//Hooks
import useGamepad from '../../../../hooks/useGamepad';

//Components
import Properties from './Properties';
import Libraries from './Libraries';
import Image from '../../../../components/Image';

//Layouts
import MainLayout from '../../../../layouts/MainLayout';

//Local
import menuItems from './menuItems';

//Shared
import {
    app,
    gamepadButtons
} from '../../../../shared/const';

//Interfaces
import IGamepadLayout from '../../../../interfaces/GamepadLayout';

//Assets
import logo from '../../../../assets/images/logo/logo-gradient.png';

//Styles
import styles from './About.module.css';


/**
 * About
 * 
 * @returns 
 */
function About(): React.ReactNode {
    /**
     * Hooks
     * 
     */
    const gamepad = useGamepad();


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
                <div className={styles.row}>
                    <div className={styles.col}>
                        <Image
                            className={styles.logo}
                            src={logo} />
                        <span className={styles.title}>
                            {app.name}
                        </span>
                    </div>
                    <div className={styles.col}>
                        <Properties />
                        <Libraries />
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default About;
