//React
import { useContext, useEffect } from 'react';

//Router
import { useNavigate } from 'react-router-dom';

//Ctx
import { AppContext } from '../../../context/App';

//Componenets
import Library from '../Library';

//Shared
import { KEYBOARD_BUTTONS } from '../../../shared/const';

//Styles
import styles from './Footer.module.css';


let navigateTimeout: any;


/**
 * Footer (LibraryLayout)
 * 
 * @returns 
 */
function Footer() {
    //Context
    const { appState } = useContext(AppContext);


    //Hooks
    const navigate = useNavigate();


    useEffect(() => {
        window.addEventListener('keydown', (e: any) => {
            onKeyPress(e.keyCode);
        });

        return () => {
            window.removeEventListener('keydown', () => { });
        }
    });


    /**
     * openPage
     * 
     * Oldal megnyitására szolgáló funkció
     * (TO-DO: megoldást találni a timeout elhagyására)
     */
    const openPage = (route: string, state?: any) => {
        clearTimeout(navigateTimeout);

        navigateTimeout = setTimeout(() => {
            navigate(route, {
                state: state || undefined
            });
        }, 750);
    }


    /**
     * onKeyPress
     * 
     * @param keyCode
     * @returns 
     */
    const onKeyPress = (keyCode: number) => {
        switch (keyCode) {
            case KEYBOARD_BUTTONS.rshift: {
                openPage('/settings');
                break;
            }
            case KEYBOARD_BUTTONS.esc: {
                openPage("/exit");
                break;
            }
            default: return null;
        }
    }


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
