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

interface Props {
    children: any;
}

interface IRouteState {
    activePages: Array<string>;
}

interface IRouteContext {
    routeState: IRouteState;
    setRouteState: (type: any, payload: any) => void;
}


export const RouteContext = createContext<IRouteContext>({
    routeState: initialState,
    setRouteState: () => null
});


export const RouteProvider = (props: Props) => {
    const [routeState, dispatch] = useReducer(reducer, initialState);
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