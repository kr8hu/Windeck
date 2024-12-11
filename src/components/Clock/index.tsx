//React
import {
    ReactNode,
    useEffect,
    useRef,
    useState
} from 'react';

//Styles
import styles from './Clock.module.css';


/**
 * Clock
 * 
 * @returns 
 */
function Clock(): ReactNode {
    /**
     * Refs
     * 
     */
    const intervalRef = useRef<any>(null);


    /**
     * States
     * 
     */
    const [time, setTime] = useState<string | null>(null);


    /**
     * useEffect
     * 
     */
    useEffect(() => {
        syncTime();
        intervalRef.current = setInterval(() => syncTime(), 1000);

        return () => clearInterval(intervalRef.current);
    }, []);


    /**
     * syncTime
     * 
     */
    const syncTime = (): void => {
        const date = new Date();
        const hours = date.getHours().toString();
        const minutes = date.getMinutes().toString();

        const time = {
            hours: hours.length > 1 ? hours : `0${hours}`,
            minutes: minutes.length > 1 ? minutes : `0${minutes}`
        };

        setTime(`${time.hours}:${time.minutes}`);
    }


    return (
        <div className={styles.container}>
            <span className={styles.clock}>
                {time}
            </span>
        </div>
    )
}

export default Clock;
