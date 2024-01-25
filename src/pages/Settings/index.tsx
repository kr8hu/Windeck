//Components
import Setting from './Setting';
import DefaultLayout from '../../layouts/DefaultLayout';

//Local
import options from './options';
import menuItems from './menuItems';

//Styles
import styles from './Settings.module.css';


/**
 * Settings
 * 
 * @returns 
 */
function Settings() {
    return (
        <div className={styles.container}>
            <DefaultLayout menuItems={menuItems}>
                <div className={styles.row}>
                    {options.map((option: any, idx: number) => {
                        return (
                            <div key={idx} className={styles.col}>
                                <Setting data={option} />
                            </div>
                        )
                    })}
                </div>
            </DefaultLayout>
        </div>
    )
}


export default Settings;
