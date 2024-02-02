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
        <DefaultLayout menuItems={menuItems}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <ManagerEditor />
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default Manager;
