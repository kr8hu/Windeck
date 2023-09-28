//Shared
import { actionTypes } from "../../shared/const";


export const reducer = (state: any, action: any) => {
    switch (action.type) {
        case actionTypes.route.SET_ACTIVE_PAGE:
            return {
                ...state,
                activePages: [...state.activePages, action.payload]
            }
        case actionTypes.route.REMOVE_ACTIVE_PAGE:
            return {
                ...state,
                activePages: state.activePages.filter((_: any, idx: number) => idx !== state.activePages.length - 1)
            }

        default:
            return state;
    }
}

export const initialState = {
    activePages: ['/']
}