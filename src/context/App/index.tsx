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

interface Props {
    children: any;
}

interface IAppState {
    selected: number;
    locked: boolean;
    library: any;
}

interface IAppContext {
    appState: IAppState;
    setAppState: (type: any, payload: any) => void;
}


export const AppContext = createContext<IAppContext>({
    appState: initialState,
    setAppState: () => null
});


export const AppProvider = (props: Props) => {
    const [appState, dispatch] = useReducer(reducer, initialState);
    const setAppState = (type: any, payload: any) => dispatch({ type, payload });


    useEffect(() => {
        if (appState.library.length !== 0) {
            localStorage.setItem('windeck__library', JSON.stringify(appState.library))
        } else {
            localStorage.setItem('windeck__library', '[]')
        }
    }, [appState.library]);

    
    return (
        <AppContext.Provider value={{
            appState,
            setAppState
        }}>
            {props.children}
        </AppContext.Provider>
    )
}