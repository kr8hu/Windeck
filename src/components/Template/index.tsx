//React Router
import { Link } from 'react-router-dom';

//Components
import Clock from '../Clock';
import Background from '../Background';

//Assets
import logo from '../../assets/images/logo/logo-gradient.png';
//import background from '../../assets/images/backgrounds/steamdeckbg.jpeg';

//Styles
import styles from './Template.module.css';


interface Props {
    children?: any;
    backgroundImage?: any;
    menuItems?: any;
}

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
                        {props.menuItems && props.menuItems.map((item: any, idx: number) => {
                            return (
                                <Link
                                    key={idx}
                                    to={item.path}
                                    className={styles.link}>
                                    {item.label}
                                </Link>
                            )
                        })}
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