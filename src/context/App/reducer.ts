//Shared
import {
    actionTypes
} from "../../shared/const";


export const reducer = (state: any, action: any) => {
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
        /* Elem módosítása a könyvtárból */
        case actionTypes.app.MODIFY_LIBRARY_ITEM:
            return {
                ...state,
                library: state.library.map((item: any, index: number) => index === action.payload.id ? action.payload : item)
            }
        /* Megjelölés kiválasztott elemként */
        case actionTypes.app.SET_SELECTED:
            return {
                ...state,
                selected: action.payload
            }
        /* Könyvtár zárolása */
        case actionTypes.app.SET_LOCKED:
            return {
                ...state,
                locked: action.payload
            }
        /* Idő beállítása */
        case actionTypes.app.SET_TIME:
            return {
                ...state,
                time: action.payload
            }
        default:
            return state;
    }
}

export const initialState = {
    selected: 0,
    locked: true,
    time: "",
    library: localStorage.getItem('windeck__library') ? JSON.parse(`${localStorage.getItem('windeck__library')}`) : []
}
