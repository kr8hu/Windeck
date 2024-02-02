//Components
import Logo from '../../../components/Logo';
import Pill from '../../../components/Pill';
import Clock from '../../../components/Clock';

//Local
import menuItems from './menuItems';

//Styles
import styles from './Header.module.css';


/**
 * Header (LibraryLayout)
 * 
 * @returns 
 */
function Header() {
    /**
     * renderPills
     * 
     * @returns 
     */
    const renderPills = () => {
        return menuItems.map((item: any, idx: number) => {
            return (
                <Pill
                    key={idx}
                    className={styles.pill}
                    icon={item.icon}
                    text={item.text} />
            )
        })
    }


    return (
        <div className={styles.row}>
            <div className={styles.col}>
                <Logo />
            </div>
            <div className={styles.col}>
                <div className={styles.pills}>
                    {renderPills()}
                </div>
            </div>
            <div className={styles.col}>
                <Clock />
            </div>
        </div>
    )
}

export default Header;
