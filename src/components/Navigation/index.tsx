//React Router
import { Link } from 'react-router-dom';

//Styles
import styles from './Navigation.module.css';


/**
 * Props
 * 
 * Komponens tulajdonságainak meghatározása
 */

interface Props {
    menuItems: any;
}


/**
 * Navigation
 * 
 * @param props komponens tulajdonságai
 * 
 * @returns 
 */
function Navigation(props: Props) {
    return (
        <div className={styles.container}>
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
    )
}

export default Navigation;