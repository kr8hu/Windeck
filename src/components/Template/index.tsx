//Components
import Clock from '../Clock';
import Background from '../Background';
import Navigation from '../Navigation';

//Assets
import logo from '../../assets/images/logo/logo-gradient.png';
//import background from '../../assets/images/backgrounds/steamdeckbg.jpeg';

//Styles
import styles from './Template.module.css';


/**
 * Props
 * 
 * Komponens tulajdonságainak meghatározása
 */
interface Props {
    children?: any;
    backgroundImage?: any;
    menuItems?: any;
}


/**
 * Template
 * 
 * @param props komponens tulajdonságai
 * 
 * @returns 
 */
function Template(props: Props) {
    return (
        <div className={styles.container}>
            {/* <Background image={props.backgroundImage || background} /> */}
            <Background />

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
            <div className={styles.body}>
                {props.children}
            </div>
        </div>
    )
}

export default Template;