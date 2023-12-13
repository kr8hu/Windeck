//React
import { useEffect, useState } from 'react';

//Tauri
import { exit } from '@tauri-apps/api/process';

//Router
import { useNavigate } from 'react-router-dom';

//Components
import Button from '../../components/Button';

//Assets
import logo from '../../assets/images/logo/logo-gradient.png';

//Styles
import styles from './Exit.module.css';


let interval: any;


/**
 * Exit
 * 
 * @returns 
 */
function Exit() {
    //Hook
    const navigator = useNavigate();

    //State
    const [counter, setCounter] = useState<number>(10);


    useEffect(() => {
        interval = setInterval(() => {
            setCounter((current: number) => current - 1);
        }, 1000);

        return () => {
            setCounter(10);
            clearInterval(interval);
        }
    }, []);


    //counter hatása a komponensre
    useEffect(() => {
        if (counter === 0) {
            navigator(-1);
        }
    }, [counter]);


    return (
        <div className={styles.container}>
            <img
                className={styles.logo}
                src={logo}
                alt="logo" />

            <span className={styles.text}>
                Biztosan ki szeretnél lépni?
            </span>

            <span className={styles.name}>
                Kilépés megszakítása {counter} másodpercen belül.
            </span>

            <Button
                text="Kilépés megerősítése"
                onClick={() => exit()} />
        </div>
    )
}

export default Exit;
