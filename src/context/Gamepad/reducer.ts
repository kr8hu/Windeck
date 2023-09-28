//Shared
import {
    actionTypes
} from "../../shared/const";


export const reducer = (state: any, action: any) => {
    switch (action.type) {
        case actionTypes.gamepad.SET_KEYMAP:
            return {
                ...state,
                keymap: action.payload
            }
        case actionTypes.gamepad.SET_PRESSED:
            return {
                ...state,
                pressed: action.payload
            }
        default:
            return state;
    }
}

export const initialState = {
    keymap: undefined,
    pressed: -1
}
