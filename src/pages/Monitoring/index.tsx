//React
import { useContext } from 'react';

//Components
import Template from '../../components/Template';

//Ctx
import { AppContext } from '../../context/App';
import { GamepadContext } from '../../context/Gamepad';

//Styles
import styles from './Monitoring.module.css';


/**
 * Monitoring
 * 
 * @returns 
 */
function Monitoring() {
    //Ctx
    const { appState } = useContext(AppContext);
    const { gamepadState } = useContext(GamepadContext);


    //Menu Items
    const menuItems = [
        {
            label: 'Vissza',
            path: -1
        }
    ];


    //Datasources
    const datas = [
        {
            name: 'appState',
            source: appState,
        },
        {
            name: 'gamepadState',
            source: gamepadState,
        }
    ]


    return (
        <div className={styles.container}>
            <Template menuItems={menuItems}>
                <div className={styles.content}>
                    {datas.map((data: any, idx: number) => {
                        return (
                            <div className={styles.section} key={idx}>
                                <span className={styles.title}>
                                    {data.name}
                                </span>
                                <span className={styles.data}>
                                    {JSON.stringify(data.source)}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </Template>
        </div>
    )
}


export default Monitoring;
