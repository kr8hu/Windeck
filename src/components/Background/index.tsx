//React
import React, { useContext } from 'react';

//Context
import { AppContext } from '../../context/App';

//Styles
import styles from './Background.module.css';


/**
 * Background
 * 
 * Háttérelem komponens
 */
function Background() {
    //Context
    const { appState } = useContext(AppContext);


    return (
        <React.Fragment>
            <div className={styles.layer} />
            <div className={styles.wrapper}>
                <div
                    className={styles.background}
                    style={{
                        backgroundImage: `url(${appState.library[appState.selected].image})`
                    }} />
            </div>
        </React.Fragment>
    )
}

export default Background;