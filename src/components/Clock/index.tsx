//React
import { useContext } from 'react';

//Ctx
import { AppContext } from '../../context/App';

//Styles
import styles from './Clock.module.css';


/**
 * Clock
 * 
 * @returns 
 */
function Clock() {
    const { appState } = useContext(AppContext);


    return (
        <div className={styles.container}>
            <span className={styles.clock}>
                {appState.time}
            </span>
        </div>
    )
}

export default Clock;
