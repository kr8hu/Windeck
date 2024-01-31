//Components
import Header from './Header';

//Styles
import styles from './DefaultLayout.module.css';


/**
 * Props
 * 
 */
interface Props {
    children?: any;
    backgroundImage?: any;
    menuItems?: any;
}


/**
 * DefaultLayout
 * 
 * @param props 
 * @returns 
 */
function DefaultLayout(props: Props) {
    return (
        <div className={styles.container}>
            {/* Fejléc */}
            <div className={styles.header}>
                <Header menuItems={props.menuItems} />
            </div>
            
            {/* Tartalom */}
            <div className={styles.body}>
                {props.children}
            </div>
        </div>
    )
}

export default DefaultLayout;