//React
import React, {
    useState,
    useEffect
} from 'react';

//React Router
import {
    Routes,
    Route
} from 'react-router-dom';

//Shared
import PAGES from './shared/pages';


/**
 * RouteItem
 */
type RouteItem = {
    path: string;
    component: React.ComponentType<any>;
};


/**
 * RouteStack
 * 
 * Oldalakat és a hozzá tartozó útvonalakat generáló komponens.
 * @returns 
 */
function RouteStack() {
    //State
    const [routeStack, setRouteStack] = useState<RouteItem[]>([]);


    //Stack feltöltése
    useEffect(() => {
        if (routeStack.length !== 0) return;

        for (let [, value] of Object.entries(PAGES)) {
            setRouteStack((prevState: RouteItem[]) => [
                ...prevState,
                {
                    path: value.path,
                    component: value.component
                }
            ]);
        }
        //eslint-disable-next-line
    }, []);


    //Ellenörzés
    useEffect(() => {
        if (routeStack.length === Object.keys(PAGES).length) {
            console.log(routeStack)
        }
    }, [routeStack]);


    /**
     * renderRoutes
     * 
     * @returns 
     */
    const renderRoutes = () => {
        return routeStack.map((route: RouteItem, key: number) => {
            return (
                <Route
                    key={key}
                    path={'/' + route.path}
                    element={<route.component />} />
            )
        })
    }


    return (
        <React.Fragment>
            <Routes>
                {renderRoutes()}
            </Routes>
        </React.Fragment>
    )
}

export default RouteStack;