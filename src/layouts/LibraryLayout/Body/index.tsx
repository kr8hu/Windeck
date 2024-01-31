//React
import { useContext } from 'react';

//Ctx
import { AppContext } from '../../../context/App';

//Components
import ButtonGroup from './ButtonGroup';

//Styles
import styles from './Body.module.css';


/**
 * Body
 * 
 * Tartalmi részt megjelenítő komponens
 * 
 * @returns 
 */
function Body() {
    //Context
    const { appState } = useContext(AppContext);


    return (
        <div className={styles.row}>
            <div className={styles.col}>

            </div>
            <div className={styles.col}>
                <div className={styles.data}>
                    <img
                        className={styles.cover}
                        src={appState.library[appState.selected].image}
                        alt="cover"
                    />
                    <span className={styles.title}>
                        {appState.library[appState.selected].name}
                    </span>
                </div>
            </div>
            <div className={styles.col}>
                <ButtonGroup />
            </div>
            <div className={styles.col}>

            </div>
        </div>
    )
}

export default Body;
