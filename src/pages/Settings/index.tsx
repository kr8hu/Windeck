//ReactRouter
import { useNavigate } from 'react-router-dom';

//Components
import Template from '../../components/Template';

//Styles
import styles from './Settings.module.css';
import Button from '../../components/Button';


function Settings() {
    //Router
    const navigator = useNavigate();

    //Menu Items
    const menuItems = [
        {
            label: 'Vissza a kezdőlapra',
            path: -1
        }
    ];

    //Setting options
    const settings = [
        {
            title: "Szerkesztő",
            path: '/editor'
        },
        {
            title: "Monitorozás",
            path: '/monitoring'
        },
        {
            title: "",
            path: -1
        },
        {
            title: "",
            path: -1
        },
        {
            title: "",
            path: -1
        },
        {
            title: "",
            path: -1
        },
        {
            title: "",
            path: -1
        },
        {
            title: "",
            path: -1
        }
    ]


    return (
        <div className={styles.container}>
            <Template menuItems={menuItems}>
                <div className={styles.row}>
                    {settings.map((setting: any, idx: number) => {
                        return (
                            <div key={idx} className={styles.col}>
                                <div className={styles.box}>
                                    <span className={styles.title}>
                                        {setting.title}
                                    </span>

                                    <Button
                                        text="Megnyitás"
                                        onClick={() => navigator(setting.path)} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Template>
        </div>
    )
}


export default Settings;
