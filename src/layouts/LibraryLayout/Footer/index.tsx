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
        <>
            {appState.library.length !== 0 ?
                <Library />
                :
                <span className={styles.placeholder}>
                    A könyvtárad jelenleg üres.
                </span>
            }
        </>
    )
}

export default Footer;
