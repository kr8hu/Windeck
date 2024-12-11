//Components
import Logo from '../../components/Logo';

//Styles
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
function ActionLayout({ children, title, text }: Props) {
    return (
        <div className={styles.container}>
            <Logo className={styles.logo} />

            <span className={styles.title}>
                {title}
            </span>

            <span className={styles.text}>
                {text}
            </span>

            {children}
        </div>
    )
}

export default ActionLayout;