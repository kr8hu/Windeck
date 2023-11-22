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


/**
 * Props
 * 
 * Komponens tulajdonságainak meghatározása
 */
interface Props {
    children: any;
}


/**
 * IAppState
 * 
 * State tulajdonságainak meghatározása (initialState)
 */
interface IAppState {
    selected: number;
    locked: boolean;
    library: any;
}


/**
 * IAppContext
 * 
 * Context tulajdonságainak meghatározása 
 */
interface IAppContext {
    appState: IAppState;
    setAppState: (type: any, payload: any) => void;
}


/**
 * AppContext
 * 
 * Context létrehozása
 */
export const AppContext = createContext<IAppContext>({
    appState: initialState,
    setAppState: () => null
});


/**
 * AppProvider
 * 
 * Olyan komponens, ami elérhetővé teszi 
 * a state objektumot és state módosító funkciót
 * 
 * @param props komponens tulajdonságai
 * @returns 
 */
export const AppProvider = (props: Props) => {
    //Getter
    const [appState, dispatch] = useReducer(reducer, initialState);

    //Setter
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