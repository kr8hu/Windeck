//Components
import Template from '../../components/Template';
import ManagerEditor from './DataEditor';

//Local
import menuItems from './menuItems';

//Styles
import styles from './Manager.module.css';


/**
 * Manager
 * 
 * @returns 
 */
function Manager() {
    return (
        <div className={styles.container}>
            <Template menuItems={menuItems}>
                <div className={styles.row}>
                    <div className={styles.col}>
                       <ManagerEditor />
                    </div>
                </div>
            </Template>
        </div>
    )
}

export default Manager;
