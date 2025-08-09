//React
import {
    createContext,
    useEffect,
    useReducer
} from 'react';

//Reducer
import {
    reducer,
    initialState
} from './reducer';

//Shared
import { localStorages } from '../../shared/const';

//Interfaces
import IGamepadLayout from '../../interfaces/GamepadLayout';


/**
 * Props
 * 
 */
interface Props {
    children: any;
}


/**
 * IAppState
 * 
 */
interface IAppState {
    gamepadLayout: IGamepadLayout[];
    library: any;
    locked: boolean;
    selected: number;
    keyboard: boolean;
}


/**
 * IAppContext
 * 
 */
interface IAppContext {
    appState: IAppState;
    setAppState: (type: any, payload: any) => void;
}


/**
 * AppContext
 * 
 */
export const AppContext = createContext<IAppContext>({
    appState: initialState,
    setAppState: () => null
});


/**
 * AppProvider
 * 
 * @param props 
 * @returns 
 */
export const AppProvider = (props: Props) => {
    const [appState, dispatch] = useReducer(reducer, initialState);
    const setAppState = (type: any, payload: any) => dispatch({ type, payload });


    /**
     * useEffect
     * 
     * Konyvtár módosulásakor mentés a localStorage-ba
     */
    useEffect(() => {
        const initialStorage: any = [];

        if (appState.library.length !== 0) {
            localStorage.setItem(localStorages.library, JSON.stringify(appState.library))
        } else {
            localStorage.setItem(localStorages.library, initialStorage)
        }
    }, [appState.library]);


    return (
        <AppContext.Provider value={{ appState, setAppState }}>
            {props.children}
        </AppContext.Provider>
    )
}