//Pages
import Editor from '../pages/Editor';
import Exit from '../pages/Exit';
import Home from '../pages/Home';
import Launch from '../pages/Launch';
import Monitoring from '../pages/Monitoring';
import Settings from '../pages/Settings';


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
        key: 'editor',
        path: '/editor',
        title: 'Szerkesztő',
        component: Editor
    },
    monitoring: {
        id: 4,
        key: 'monitoring',
        path: '/monitoring',
        title: 'Monitorozás',
        component: Monitoring
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