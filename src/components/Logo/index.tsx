//React
import { ReactNode } from 'react';

//Assets
import logo from '../../assets/images/logo/logo-gradient.png';

//Styles
import styles from './Logo.module.css';


/**
 * Props
 */
interface Props {
    className?: any;
}


/**
 * Logo
 * 
 * @returns 
 */
function Logo({ className }: Props): ReactNode {
    return (
        <div className={`${styles.container} ${className}`}>
            <img
                className={styles.logo}
                src={logo} />
        </div>
    )
}

export default Logo;
