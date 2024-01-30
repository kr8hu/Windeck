//React
import React from 'react';

//Styles
import styles from './Background.module.css';


/**
 * Props
 * 
*/
interface Props {
    image: string;
}


/**
 * Background
 * 
 * Háttérkép komponens
 */
function Background(props: Props) {
    return (
        <React.Fragment>
            <div
                className={styles.background}
                style={{
                    backgroundImage: `url(${props.image})`
                }}
            />
            <div className={styles.layer} />
        </React.Fragment>
    )
}

export default Background;