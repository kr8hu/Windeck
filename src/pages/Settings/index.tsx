//Components
import Setting from './Setting';

//Layout
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
        <DefaultLayout menuItems={menuItems}>
            <div className={styles.container}>
                <div className={styles.row}>
                    {options.map((option: any, idx: number) => {
                        return (
                            <div key={idx} className={styles.col}>
                                <Setting data={option} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </DefaultLayout>
    )
}


export default Settings;
