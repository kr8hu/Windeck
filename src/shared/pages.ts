//Pages
import Exit from '../pages/Exit';
import Home from '../pages/Home';
import Launch from '../pages/Launch';
import Settings from '../pages/Settings';
import Manager from '../pages/Manager';


/**
 * PAGES
 * 
 * Oldalak adatait tartalmazó objektum
 */
const PAGES = {
    home: {
        id: 1,
        key: 'home',
        path: '/',
        title: 'Kezdőoldal',
        component: Home
    },
    settings: {
        id: 2,
        key: 'settings',
        path: '/settings',
        title: 'Beállítások',
        component: Settings
    },
    editor: {
        id: 3,
        key: 'manager',
        path: '/manager',
        title: 'Hozzáadás',
        component: Manager
    },
    launch: {
        id: 5,
        key: 'launch',
        path: '/launch',
        title: 'Indítás',
        component: Launch
    }, 
    exit: {
        id: 6,
        key: 'exit',
        path: '/exit',
        title: 'Kilépés',
        component: Exit
    }
}

export default PAGES;