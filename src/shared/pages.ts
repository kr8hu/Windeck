//Pages
import Exit from '../pages/Exit';
import Home from '../pages/Home';
import Editor from '../pages/Editor';
import Launch from '../pages/Launch';
import Manager from '../pages/Settings/Setting/Manager';
import Settings from '../pages/Settings';
import About from '../pages/Settings/Setting/About';
import License from '../pages/Settings/Setting/About/License';


/**
 * PAGES
 * 
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
    manager: {
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
    }, 
    editor: {
        id: 6,
        key: 'editor',
        path: '/editor',
        title: 'Szerkesztő',
        component: Editor
    }, 
    about: {
        id: 7,
        key: 'about',
        path: '/about',
        title: 'Névjegy',
        component: About
    }, 
    license: {
        id: 8,
        key: 'license',
        path: '/about/license',
        title: 'Licensz',
        component: License
    }
}

export default PAGES;