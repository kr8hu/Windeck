//Shared
import {
    actionTypes,
    localStorages
} from "../../shared/const";


/**
 * initialLibrary
 * 
 * Könyvtár tartalma
 */
export const initialLibrary = localStorage.getItem(localStorages.library) ? JSON.parse(`${localStorage.getItem(localStorages.library)}`) : []


/**
 * reducer
 * 
 * @param state 
 * @param action 
 * @returns 
 */
export const reducer = (state: any, action: any): any => {
    switch (action.type) {
        /* Elem hozzáadás a könyvtárhoz */
        case actionTypes.app.ADD_LIBRARY_ITEM:
            return {
                ...state,
                library: [
                    ...state.library,
                    action.payload
                ]
            }
        /* Könyvtár feltöltése */
        case actionTypes.app.SET_LIBRARY:
            return {
                ...state,
                library: action.payload
            }
        /* Elem törlés a könyvtárból */
        case actionTypes.app.DELETE_LIBRARY_ITEM:
            return {
                ...state,
                library: state.library.filter((_: any, index: number) => index !== action.payload)
            }
        /* Elem módosítása a könyvtárban */
        case actionTypes.app.MODIFY_LIBRARY_ITEM:
            return {
                ...state,
                library: state.library.map((item: any, index: number) => index === action.payload.id ? action.payload : item)
            }
        /* Kiválasztott elem azonosítójának beállítása */
        case actionTypes.app.SET_SELECTED:
            return {
                ...state,
                selected: action.payload
            }
        /* Alkalmazás megnyitásának tiltása/engedélyezése */
        case actionTypes.app.SET_LOCKED:
            return {
                ...state,
                locked: action.payload
            }
        /* Kontroller gombkiosztása */
        case actionTypes.app.SET_GAMEPAD_LAYOUT:
            return {
                ...state,
                gamepadLayout: action.payload
            }
        /* Billentyűzet */
        case actionTypes.app.SET_KEYBOARD:
            return {
                ...state,
                keyboard: action.payload
            }
        default:
            return state;
    }
}

export const initialState = {
    gamepadLayout: [],
    library: initialLibrary,
    locked: false,
    keyboard: false,
    selected: 0,
}
