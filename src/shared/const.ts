/**
 * app
 * 
 */
export const app = {
    name: "Windeck",
    version: "1.0",
    build: "1.0.241210.1",
}


/**
 * Action Types
 */
export const actionTypes = {
    app: {
        SET_SELECTED: 'APP_SET_SELECTED',
        SET_GAMEPAD_LAYOUT: 'APP_SET_GAMEPAD_LAYOUT',
        ADD_LIBRARY_ITEM: 'APP_ADD_LIBRARY_ITEM',
        SET_LIBRARY: 'APP_SET_LIBRARY',
        MODIFY_LIBRARY_ITEM: 'APP_MODIFY_LIBRARY_ITEM',
        DELETE_LIBRARY_ITEM: 'APP_DELETE_LIBRARY_ITEM',
        SET_TIME: 'APP_SET_TIME',
        SET_LOCKED: 'APP_SET_LOCKED',
        SET_KEYBOARD: 'SET_KEYBOARD'
    },
}


/**
 * gamepadButtons
 */
export const gamepadButtons = {
    L1: 4,
    R1: 5,
    SHARE: 8,
    OPTIONS: 9,
    UP: 12,
    DOWN: 13,
    LEFT: 14,
    RIGHT: 15,
    Y: 3,
    X: 2,
    B: 1,
    A: 0,
    DIRECTIONS: -1
};


/**
 * keyboardButtons
 */
export const keyboardButtons = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    ESC: 27,
    F1: 112,
    F12: 123,
    INSERT: 45,
    ENTER: 13,
    RSHIFT: 16,
    BACKSPACE: 8
}


/**
 * touchKeyboardLocation
 * 
 */
export const touchKeyboardLocation = `C:\\\\Program Files\\\\Common Files\\\\Microsoft Shared\\\\ink\\\\TabTip.exe`;