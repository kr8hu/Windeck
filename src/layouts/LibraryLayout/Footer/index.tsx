//Hooks
import useApp from '../../../hooks/useApp';

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
    const { appState } = useApp();


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
