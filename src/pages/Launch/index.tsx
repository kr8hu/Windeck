//React
import {
    useContext,
    useEffect
} from 'react';

//Tauri
import { appWindow } from '@tauri-apps/api/window';
import { invoke } from '@tauri-apps/api';

//Context
import { AppContext } from '../../context/App';

//Router
import {
    useNavigate,
    useLocation
} from 'react-router-dom';

//Components
import Button from '../../components/Button';

//Assets
import logo from '../../assets/images/logo/logo-gradient.png';

//Styles
import styles from './Launch.module.css';


/**
 * Launch
 * 
 * @returns 
 */
function Launch() {
    //Router
    const navigator = useNavigate();
    const location = useLocation();

    //Ctx
    const { appState } = useContext(AppContext);


    //Tauri listener aktiválása
    useEffect(() => {
        addTauriEventListener();
    }, []);


    //location.state.path hatása a komponensre
    useEffect(() => {
        if (location.state.path === undefined) return;

        //Futtatás
        runExecutable(location.state.path);
    }, [location.state.path]);


    /**
     * runExecutable
     * 
     * A megadott útvonalon található alkalmazás futtatása
     * 
     * @param path program útvonala
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
     * addTauriEventListener
     * 
     * Tauri eseményfigyelő létrehozása
     */
    const addTauriEventListener = async () => {
        await appWindow.listen(
            'PROGRESS_RUNEXEC',
            ({ event, payload }: { event: any, payload: { status: boolean } }) => {
                console.log(event);
                console.log(payload);
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
