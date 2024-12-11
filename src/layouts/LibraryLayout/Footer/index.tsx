//React
import { useContext } from 'react';

//Context
import { AppContext } from '../../../context/App';

//Componenets
import Library from '../Library';

//Styles
import styles from './Footer.module.css';


/**
 * Footer (LibraryLayout)
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
                    A könyvtárad jelenleg üres. A felvételhez nyisd meg a beállításokat.
                </span>
            }
        </>
    )
}

export default Footer;
