//React
import React from 'react';

//Styles
import styles from './Background.module.css';


/**
 * Background
 * 
 * Háttérelem komponens
 */
function Background() {
    return (
        <React.Fragment>
            <div className={styles.layer} />
            <div className={styles.wrapper}>
                <div className={styles.background} />
            </div>
        </React.Fragment>
    )
}

export default Background;