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

    //Ctx
    const { appState } = useContext(AppContext);

    //State
    const [status, setStatus] = useState<any>(false);


    useEffect(() => {
        //Progress listener
        tauriEventListener();
    }, []);


    useEffect(() => {
        //Program status check
        if(status) {
            console.log("A program indítása sikeres.")
        } else {
            console.log("Hiba lépett fel a program futtatásakor.")
        }
    }, [status]);


    useEffect(() => {
        //Hibakezelés
        if (location.state.path === undefined) return;

        //Futtatható állomány megnyitása
        runExecutable(location.state.path);
    }, [location.state.path]);


    /**
     * A megadott útvonalon lévő alkalmazás futtatása
     * @param path 
     */
    const runExecutable = async (path: string) => {
        let filepath: string = "";
        const splitpath = path.split('\\');

        splitpath.map((arg: string, idx: number) => {
            if (idx === splitpath.length - 1) return;
            filepath = filepath + `${arg}\\`;
        });

        await invoke('runexec', {
            path: filepath,
            file: splitpath[splitpath.length - 1]
        });
    }


    /**
     * Eseményfigyelő
     */
    const tauriEventListener = async () => {
        await appWindow.listen(
            'PROGRESS_RUNEXEC',
            ({ event, payload }: { event: any, payload: { status: boolean } }) => {
                console.log('Tauri event triggered: ' + event);
                setStatus(payload.status);
            }
        );
    }


    return (
        <div className={styles.container}>
            <img
                className={styles.logo}
                src={logo}
                alt="logo" />

            <span className={styles.text}>
                A program futása folyamatban
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
