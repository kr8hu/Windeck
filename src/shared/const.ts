//Launcher images
import launcher_default from '../assets/images/launchers/default.png';
import launcher_steam from '../assets/images/launchers/steam.png';
import launcher_ea from '../assets/images/launchers/ea.png';
import launcher_ubisoft from '../assets/images/launchers/uplay.png';
import launcher_epic from '../assets/images/launchers/epic.png';
import launcher_rockstar from '../assets/images/launchers/rockstar.png';
import launcher_gog from '../assets/images/launchers/gog.png';


/**
 * Action Types
 */
export const actionTypes = {
    app: {
        SET_SELECTED: 'SET_SELECTED',
        SET_LOCKED: 'SET_LOCKED',
        ADD_LIBRARY_ITEM: 'ADD_LIBRARY_ITEM',
        SET_LIBRARY: 'SET_LIBRARY',
        DELETE_LIBRARY_ITEM: 'DELETE_LIBRARY_ITEM'
    },
    gamepad: {
        SET_KEYMAP: 'SET_KEYMAP',
        SET_PRESSED: 'SET_PRESSED'
    },
    route: {
        SET_ACTIVE_PAGE: 'SET_ACTIVE_PAGE',
        REMOVE_ACTIVE_PAGE: 'REMOVE_ACTIVE_PAGE'
    }
}

//Kontrolleren lévő gombok indexei
export const GAMEPAD_KEYS = {
    L1: 4,
    R1: 5,
    share: 8,
    options: 9,
    up: 12,
    down: 13,
    left: 14,
    right: 15,
    Y: 3,
    X: 2,
    B: 1,
    A: 0,
};

//Billentyűzeti iránygombok indexei
export const KEYBOARD_KEYS = {
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    esc: 27,
    R1: 18,
    L1: 17,
    insert: 45
}

//Beállítások típusai
export const SETTING_TYPES = {
    input: 0,
    select: 1,
    checkbox: 2,
    radio: 3,
    browse: 4,
}

export const LAUNCHERS = {
    default: {
        id: -1,
        name: "-",
        logo: launcher_default,
    },
    steam: {
        id: 0,
        name: "Steam",
        logo: launcher_steam,
    },
    ea: {
        id: 1,
        name: "EA App",
        logo: launcher_ea,
    },
    ubisoft: {
        id: 2,
        name: "Ubisoft Connect",
        logo: launcher_ubisoft,
    },
    rockstar: {
        id: 3,
        name: "Rockstar Games Launcher",
        logo: launcher_rockstar,
    },
    epic: {
        id: 4,
        name: "Epic",
        logo: launcher_epic,
    },
    gog: {
        id: 5,
        name: "GOG",
        logo: launcher_gog,
    },
}
