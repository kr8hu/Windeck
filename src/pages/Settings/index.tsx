//Components
import Option from './Option';
import Template from '../../components/Template';

//Local
import options from './options';

//Styles
import styles from './Settings.module.css';


/**
 * Settings
 * 
 * Beállítások oldal
 * 
 * @returns 
 */
function Settings() {
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
                    {options.map((option: any, idx: number) => {
                        return (
                            <div key={idx} className={styles.col}>
                                <Option data={option} />
                            </div>
                        )
                    })}
                </div>
            </Template>
        </div>
    )
}


export default Settings;
