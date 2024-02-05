//React
import { useContext } from 'react';

//Ctx
import { AppContext } from '../../context/App';

//Components
import Body from './Body';
import Header from './Header';
import Footer from './Footer';
import Background from './Background';

//Local
import menuItems from './menuItems';

//Styles
import styles from './LibraryLayout.module.css';



/**
 * LibraryLayout
 * 
 * @param props 
 * @returns 
 */
function LibraryLayout() {
    //Context
    const { appState } = useContext(AppContext);


    return (
        <div
            className={styles.container}
            style={{
                backgroundColor: appState.library.length === 0 ? 'black' : 'transparent'
            }}>
            <Background image={appState.library[appState.selected]?.image} />

            <div className={styles.row}>
                <div className={styles.col}>
                    <Header menuItems={menuItems}/>
                </div>
                <div className={styles.col}>
                    <Body />
                </div>
                <div className={styles.col}>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default LibraryLayout;