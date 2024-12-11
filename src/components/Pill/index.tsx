//Shared
import { ReactNode } from 'react';
import { getGamepadButton } from '../../shared/utils';

//Styles
import styles from './Pill.module.css';


/**
 * Props
 * 
 */
interface Props {
    icon: any;
    text: string;
    className?: any;
    transparent?: boolean;
}


/**
 * Pill
 *
 */
function Pill({ icon, text, transparent, className }: Props): ReactNode {
    return (
        <div    
            className={`${styles.container} ${className}`}
            data-transparent={transparent}>
            <div className={styles.row}>
                <div className={styles.col}>
                    <img
                        className={styles.icon}
                        src={getGamepadButton(icon)}
                        alt="icon" />
                </div>

                <div className={styles.col}>
                    <span className={styles.text}>
                        {text}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Pill;
