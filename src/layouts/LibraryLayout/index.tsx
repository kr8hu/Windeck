//React
import { useContext } from 'react';

//Ctx
import { AppContext } from '../../context/App';

//Components
import Body from './Body';
import Header from './Header';
import Footer from './Footer';
import Background from './Background';

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
        <div className={styles.container}>
            <Background image={appState.library[appState.selected].image} />

            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.body}>
                <Body />
            </div>
            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    )
}

export default LibraryLayout;