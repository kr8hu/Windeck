//React Router
import { Link } from 'react-router-dom';

//Types
import MenuItem from '../../types/MenuItem';

//Styles
import styles from './Navigation.module.css';


/**
 * Props
 * 
 */
interface Props {
    menuItems: any;
}


/**
 * Navigation
 * 
 * @param props 
 * 
 * @returns 
 */
function Navigation(props: Props) {
    return (
        <div className={styles.container}>
            {props.menuItems && props.menuItems.map((menuItem: MenuItem, idx: number) => {
                return (
                    <Link
                        key={idx}
                        to={menuItem.path}
                        className={styles.link}>
                        {menuItem.text}
                    </Link>
                )
            })}
        </div>
    )
}

export default Navigation;