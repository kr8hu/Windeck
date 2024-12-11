//Components
import Logo from '../../../components/Logo';
import Clock from '../../../components/Clock';
import Navigation from '../../../components/Navigation';

//Styles
import styles from './Header.module.css';


/**
 * Props
 * 
 */
interface Props {
    menuItems: any;
}


/**
 * Header (MainLayout)
 * @returns 
 */
function Header({ menuItems }: Props) {
    return (
        <>
            <div className={styles.row}>
                <div className={styles.col}>
                    <Logo />
                </div>
                <div className={styles.col}>
                    <Navigation menuItems={menuItems} />
                </div>
                <div className={styles.col}>
                    <Clock />
                </div>
            </div>
        </>
    )
}

export default Header;
