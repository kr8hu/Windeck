//Shared
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
}


/**
 * Pill
 *
 */
function Pill(props: Props) {
    return (
        <div className={`${styles.container} ${props.className}`}>
            <div className={styles.row}>
                <div className={styles.col}>
                    <img
                        className={styles.icon}
                        src={getGamepadButton(props.icon)}
                        alt="icon" />
                </div>

                <div className={styles.col}>
                    <span className={styles.text}>
                        {props.text}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Pill;
