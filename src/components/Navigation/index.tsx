//React Router
import { Link } from 'react-router-dom';

//Types
import MenuItem from '../../interfaces/MenuItem';

//Styles
import styles from './Navigation.module.css';
import { ReactNode } from 'react';


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
function Navigation({ menuItems }: Props): ReactNode {
    return (
        <div className={styles.container}>
            {menuItems && menuItems.map((menuItem: MenuItem, idx: number) => {
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