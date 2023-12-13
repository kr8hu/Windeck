//React
import React, {
    useState,
    useEffect
} from 'react';

//React Router
import { Routes, Route } from 'react-router-dom';

//Shared
import PAGES from './shared/pages';


/**
 * RouteStack
 * 
 * Ez a komponens az oldalakat és útvonalakat generálja.
 * @returns 
 */
function RouteStack() {
    //State
    const [routeStack, setRouteStack] = useState<any>([]);


    //Stack feltöltése
    useEffect(() => {
        if (routeStack.length !== 0) return;

        for (let [, value] of Object.entries(PAGES)) {
            setRouteStack((prevState: any) => [
                ...prevState,
                {
                    path: value.path,
                    component: value.component
                }
            ]);
        }
        //eslint-disable-next-line
    }, []);

    
    useEffect(() => {
        if (routeStack.length === Object.keys(PAGES).length) {
            console.log(routeStack)
        }
    }, [routeStack]);


    return (
        <React.Fragment>
            <Routes>
                {routeStack.map((route: any, key: number) => {
                    return (
                        <Route
                            key={key}
                            path={'/' + route.path}
                            element={<route.component />} />
                    )
                })}
            </Routes>
        </React.Fragment>
    )
}

export default RouteStack;