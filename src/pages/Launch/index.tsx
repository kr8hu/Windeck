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
import { useNavigate } from 'react-router-dom';

//Components
import Button from '../../components/Button';

//Layouts
import ActionLayout from '../../layouts/ActionLayout';


/**
 * Launch
 * 
 * @returns 
 */
function Launch() {
    //Ctx
    const { appState } = useContext(AppContext);


    //Hooks
    const navigate = useNavigate();


    //Tauri listener hozzáadása
    useEffect(() => {
        addTauriEventListener();
    }, []);


    /**
     * Elérési útvonalon található program futtatása
     */
    useEffect(() => {
        if (appState.library[appState.selected].path === undefined) return;

        //Futtatás
        runExecutable(appState.library[appState.selected].path);
    }, [appState.library[appState.selected].path]);


    /**
     * runExecutable
     * 
     * Alkalmazás futtatása
     * 
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
     * addTauriEventListener
     * 
     * Tauri listener létrehozása
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
        <ActionLayout
            title="A program futtatása folyamatban"
            text={appState.library[appState.selected].name}>

            <Button
                text="Vissza a könyvtárba"
                onClick={() => navigate(-1)} />
        </ActionLayout>
    )
}


export default Launch;
