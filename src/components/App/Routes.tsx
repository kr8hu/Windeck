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

//Types
import RouteItem from '../../interfaces/RouteItem';

//Shared
import PAGES from '../../shared/pages';


/**
 * RouteStack
 * 
 * Oldalakat és a hozzá tartozó útvonalakat generáló komponens.
 * @returns 
 */
function RouteStack() {
    /**
     * States
     * 
     */
    const [routeStack, setRouteStack] = useState<RouteItem[]>([]);


    /**
     * renderRoutes
     * 
     * @returns 
     */
    const renderRoutes = () => {
        return routeStack.map((route: RouteItem, key: number) => (
            <Route
                key={key}
                path={'/' + route.path}
                element={<route.component />} />
        ))
    }

    
    /**
     * useEffect
     * 
     * routeStack feltöltése az oldalakkal
     */
    useEffect(() => {
        if (routeStack.length !== 0) return;

        const routes = Object.values(PAGES).map(page => ({
            path: page.path,
            component: page.component
        }));

        setRouteStack(routes);
    }, [routeStack]);


    return (
        <React.Fragment>
            <Routes>
                {renderRoutes()}
            </Routes>
        </React.Fragment>
    )
}

export default RouteStack;