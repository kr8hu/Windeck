//React
import {
    CSSProperties,
} from 'react';

//Hooks
import useApp from '../../hooks/useApp';

//Components
import Body from './Body';
import Header from './Header';
import Footer from './Footer';
import Background from './Background';

//Local
import menuItems from './menuItems';

//Assets
import placeholderBackground from '../../assets/images/backgrounds/placeholderBackground.jpg';

//Styles
import styles from './LibraryLayout.module.css';



/**
 * LibraryLayout
 * 
 * @param props 
 * @returns 
 */
function LibraryLayout() {
    /**
     * Hooks
     * 
     */
    const { appState } = useApp();


    /**
     * containerStyles
     * 
     */
    const containerStyles: CSSProperties = { backgroundColor: appState.library.length === 0 ? 'black' : 'transparent' }


    return (
        <div
            className={styles.container}
            style={containerStyles}>
            <Background image={appState.library[appState.selected]?.image || placeholderBackground} />

            <div className={styles.row}>
                <div className={styles.col}>
                    <Header menuItems={menuItems} />
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