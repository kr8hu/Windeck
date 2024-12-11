//React
import {
    ReactNode,
    useContext,
    useEffect
} from 'react';

import { open } from '@tauri-apps/plugin-shell';

//Context
import { AppContext } from '../../context/App';

//Router
import { useNavigate } from 'react-router-dom';

//Components
import Button from '../../components/Button';

//Layouts
import ActionLayout from '../../layouts/ActionLayout';

//Shared
import { actionTypes } from '../../shared/const';


/**
 * Launch
 * 
 * @returns 
 */
function Launch(): ReactNode {
    /**
     * Context
     * 
     */
    const { appState, setAppState } = useContext(AppContext);


    /**
     * Hooks
     * 
     */
    const navigate = useNavigate();


    /**
     * useEffect
     * 
     * Alkalmazás lezárása a komponens mountolásakor
     */
    useEffect(() => {
        setAppState(actionTypes.app.SET_LOCKED, true);

        return () => {
            setAppState(actionTypes.app.SET_LOCKED, false);
        }
    }, []);


    /**
     * useEffect
     * 
     * Elérési útvonalon található program futtatása
     */
    useEffect(() => {
        if (appState.library[appState.selected].location === undefined) return;
        open(appState.library[appState.selected].location);
    }, [appState.library[appState.selected].location]);


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
