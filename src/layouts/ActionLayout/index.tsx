//Styles
import Logo from '../../components/Logo';
import styles from './ActionLayout.module.css';


/**
 * Props
 * 
 */
interface Props {
    children?: any;
    title: string;
    text: string;
}


/**
 * ActionLayout
 * 
 * @param props 
 * @returns 
 */
function ActionLayout(props: Props) {
    return (
        <div className={styles.container}>
            <Logo className={styles.logo} />

            <span className={styles.title}>
                {props.title}
            </span>

            <span className={styles.text}>
                {props.text}
            </span>

            {props.children}
        </div>
    )
}

export default ActionLayout;