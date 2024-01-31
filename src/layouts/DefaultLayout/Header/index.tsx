//Components
import Clock from '../../../components/Clock';
import Navigation from '../../../components/Navigation';

//Assets
import logo from '../../../assets/images/logo/logo-gradient.png';

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
 * Header (DefaultLayout)
 * @returns 
 */
function Header(props: Props) {
    return (
        <>
            <div className={styles.row}>
                <div className={styles.col}>
                    <img className={styles.logo} src={logo} />
                </div>
                <div className={styles.col}>
                    <Navigation menuItems={props.menuItems} />
                </div>
                <div className={styles.col}>
                    <Clock />
                </div>
            </div>
        </>
    )
}

export default Header;
