//Components
import Header from './Header';
import GamepadLayout from '../../components/GamepadLayout';

//Assets
import layoutBackground from '../../assets/images/backgrounds/placeholderBackground.jpg';

//Styles
import styles from './MainLayout.module.css';


/**
 * Props
 * 
 */
interface Props {
    children?: any;
    backgroundImage?: any;
    menuItems?: any;
}


/**
 * MainLayout
 * 
 * @param props 
 * @returns 
 */
function MainLayout({ backgroundImage, menuItems, children }: Props) {
    return (
        <div className={styles.container}>
            {/* Háttér */}
            <img
                className={styles.backgroundImage}
                src={backgroundImage ?? layoutBackground} />

            <div className={styles.row}>
                {/* Fejléc */}
                <div className={styles.col}>
                    <Header menuItems={menuItems} />
                </div>

                {/* Tartalom */}
                <div className={styles.col}>
                    {children}
                </div>

                {/* Lábléc */}
                <div className={styles.col}>
                    <GamepadLayout />
                </div>
            </div>
        </div>
    )
}

export default MainLayout;