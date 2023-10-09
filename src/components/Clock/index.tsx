//React
import { useEffect, useState } from 'react';

//Styles
import styles from './Clock.module.css';


let interval: any;


/**
 * Props
 * 
 * Komponens tulajdonságainak meghatározása
 */

function Clock() {
    //State
    const [hours, setHours] = useState<string>('00');
    const [minutes, setMinutes] = useState<string>('00');


    //Óra és perc frissítése
    useEffect(() => {
        interval = setInterval(() => {
            const date = new Date();
            const hours = date.getHours().toString();
            const minutes = date.getMinutes().toString();

            setHours(hours.length > 1 ? hours : `0${hours}`);
            setMinutes(minutes.length > 1 ? minutes : `0${minutes}`);
        });

        return () => clearInterval(interval);
    }, []);


    return (
        <div className={styles.container}>
            <span className={styles.clock}>
                {`${hours}:${minutes}`}
            </span>
        </div>
    )
}

export default Clock;
