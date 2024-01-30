//React
import { useContext } from 'react';

//Ctx
import { AppContext } from '../../../context/App';

//Componenets
import Library from '../Library';

//Styles
import styles from './Footer.module.css';


/**
 * Footer
 * 
 * Tartalmi részt megjelenítő komponens
 * 
 * @returns 
 */
function Footer() {
    //Context
    const { appState } = useContext(AppContext);
    

    return (
        <div className={styles.container}>
            {appState.library.length !== 0 ?
                <Library />
                :
                <span className={styles.placeholder}>
                    A könyvtárad jelenleg üres.
                </span>
            }
        </div>
    )
}

export default Footer;
