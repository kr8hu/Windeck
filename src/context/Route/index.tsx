//React
import { 
    createContext, 
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
 * IRouteState
 * 
 * State tulajdonságainak meghatározása (initialState)
 */
interface IRouteState {
    activePages: Array<string>;
}


/**
 * IRouteContext
 * 
 * Context tulajdonságainak meghatározása 
 */
interface IRouteContext {
    routeState: IRouteState;
    setRouteState: (type: any, payload: any) => void;
}


/**
 * RouteContext
 * 
 * Context létrehozása
 */
export const RouteContext = createContext<IRouteContext>({
    routeState: initialState,
    setRouteState: () => null
});


/**
 * RouteProvider
 * 
 * Wrapper komponens, ami elérhetővé teszi 
 * magát a state objektumot és state módosító funkciót
 * 
 * @param props komponens tulajdonságai
 * @returns 
 */
export const RouteProvider = (props: Props) => {
    //Getter
    const [routeState, dispatch] = useReducer(reducer, initialState);

    //Setter
    const setRouteState = (type: any, payload: any) => dispatch({ type, payload });

    return (
        <RouteContext.Provider value={{
            routeState,
            setRouteState
        }}>
            {props.children}
        </RouteContext.Provider>
    )
}