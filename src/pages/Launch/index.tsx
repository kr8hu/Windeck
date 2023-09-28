//React
import { useContext, useEffect, useState } from 'react';

//Tauri
import { appWindow } from '@tauri-apps/api/window';
import { invoke } from '@tauri-apps/api';

//Context
import { AppContext } from '../../context/App';

//Router
import { useNavigate, useLocation } from 'react-router-dom';

//Components
import Button from '../../components/Button';

//Assets
import logo from '../../assets/images/logo/logo-gradient.png';

//Styles
import styles from './Launch.module.css';


function Launch() {
    //Router
    const navigator = useNavigate();
    const location = useLocation();

    //State
    const [status, setStatus] = useState<any>(undefined);

    //Ctx
    const { appState } = useContext(AppContext);


    useEffect(() => {
        //Hibakezelés
        if (location.state.path === undefined) return;

        //Futtatható állomány megnyitása
        const runExec = async () => {
            await invoke('runexec', { path: location.state.path });
        }
        runExec();

        //Progress listener
        const tauriEventListener = async () => {
            await appWindow.listen(
                'RUNEXEC_PROGRESS',
                ({ event, payload }: { event: any, payload: { status: boolean } }) => {
                    console.log('Tauri event fired: ' + event)
                    setStatus(payload.status);
                }
            );
        }
        tauriEventListener();
    }, [location.state.path]);


    return (
        <div className={styles.container}>
            <img
                className={styles.logo}
                src={logo}
                alt="logo" />

            <span className={styles.text}>
                Indítás folyamatban
            </span>

            <span className={styles.name}>
                {appState.library[appState.selected].name}
            </span>

            <Button
                text="Vissza a könyvtárhoz"
                onClick={() => navigator(-1)} />
        </div>
    )
}


export default Launch;
