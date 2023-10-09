//React
import React from 'react';

//Styles
import styles from './Background.module.css';


/**
 * Props
 * 
 * Komponens tulajdonságainak meghatározása
 */
interface Props {
    image: any;
}


/**
 * Background
 * 
 * Háttérelem komponens
 * @param props komponens tulajdonságai
 * @returns 
 */
function Background(props: Props) {
    return (
        <React.Fragment>
            <div className={styles.layer} />
            <div
                className={styles.background}
                style={{
                    backgroundImage: `url('${props.image}')`
                }}
            />
        </React.Fragment>
    )
}

export default Background;