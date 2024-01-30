//Components
import Clock from '../../components/Clock';
import Navigation from '../../components/Navigation';

//Assets
import logo from '../../assets/images/logo/logo-gradient.png';

//Styles
import styles from './DefaultLayout.module.css';


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
 * Template
 * 
 * @param props 
 * 
 * @returns 
 */
function Template(props: Props) {
    return (
        <div className={styles.container}>
            {/* Fejléc */}
            <div className={styles.header}>
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
            </div>
            
            {/* Tartalom */}
            <div className={styles.body}>
                {props.children}
            </div>
        </div>
    )
}

export default Template;