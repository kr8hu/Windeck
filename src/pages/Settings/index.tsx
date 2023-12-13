//Components
import Setting from './Setting';
import Template from '../../components/Template';

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
            <Template menuItems={menuItems}>
                <div className={styles.row}>
                    {options.map((option: any, idx: number) => {
                        return (
                            <div key={idx} className={styles.col}>
                                <Setting data={option} />
                            </div>
                        )
                    })}
                </div>
            </Template>
        </div>
    )
}


export default Settings;
