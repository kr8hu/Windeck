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
import { actionTypes } from '../../shared/const';


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
    selected: number;
    locked: boolean;
    time: string;
    library: any;
}


/**
 * IAppContext
 * 
 */
interface IAppContext {
    appState: IAppState;
    setAppState: (type: any, payload: any) => void;
}


let interval: any;


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
    //Getter
    const [appState, dispatch] = useReducer(reducer, initialState);

    //Setter
    const setAppState = (type: any, payload: any) => dispatch({ type, payload });


    useEffect(() => {
        interval = setInterval(() => {
            const date = new Date();
            const hours = date.getHours().toString();
            const minutes = date.getMinutes().toString();

            const time = {
                hours: hours.length > 1 ? hours : `0${hours}`,
                minutes: minutes.length > 1 ? minutes : `0${minutes}`
            };

            setAppState(actionTypes.app.SET_TIME, `${time.hours}:${time.minutes}`);
        });


        return () => clearInterval(interval);
    }, []);

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