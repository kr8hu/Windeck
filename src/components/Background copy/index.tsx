//React
import React from 'react';

//Styles
import styles from './Background.module.css';


interface Props {
    image: any;
}

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