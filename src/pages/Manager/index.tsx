//Components
import ManagerEditor from './DataEditor';

//Layout
import DefaultLayout from '../../layouts/DefaultLayout';

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
            <DefaultLayout menuItems={menuItems}>
                <div className={styles.row}>
                    <div className={styles.col}>
                       <ManagerEditor />
                    </div>
                </div>
            </DefaultLayout>
        </div>
    )
}

export default Manager;
