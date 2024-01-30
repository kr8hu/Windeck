//Components
import Pill from '../../../components/Pill';
import Clock from '../../../components/Clock';

//Assets
import logo from '../../../assets/images/logo/logo-gradient.png';

//Local
import menuItems from './menuItems';

//Styles
import styles from './Header.module.css';


/**
 * Header
 * 
 * Fejléc komponens
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
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.col}>
                    <img
                        className={styles.logo}
                        src={logo} />
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
        </div>
    )
}

export default Header;
