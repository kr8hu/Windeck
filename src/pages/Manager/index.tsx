//Components
import Template from '../../components/Template';
import ManagerEditor from './DataEditor';

//Styles
import styles from './Manager.module.css';


/**
 * Manager
 * 
 * @returns 
 */
function Manager() {
    //Menu Items
    const menuItems = [
        {
            label: 'Vissza',
            path: -1
        }
    ];


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
