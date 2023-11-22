//React
import {
    createContext,
    useEffect,
    useReducer
} from 'react';

//Reducer
import {
    reducer,
    initialState
} from './reducer';
import { actionTypes } from '../../shared/const';

//Kontroller index
let gamepadIndex: any;

//Gomblenyomás ellenörzése msec-ben
const sensitivity = 100;


/**
 * Props
 * 
 * Komponens tulajdonságainak meghatározása
 */
interface Props {
    children: any;
}

interface IGamepadState {
    keymap: any;
    pressed: number;
}


/**
 * IGamepadContext
 * 
 * State tulajdonságainak meghatározása (initialState)
 */
interface IGamepadContext {
    gamepadState: IGamepadState;
    setGamepadState: (type: any, payload: any) => void;
}


/**
 * GamepadContext
 * 
 * Context létrehozása
 */
export const GamepadContext = createContext<IGamepadContext>({
    gamepadState: initialState,
    setGamepadState: () => null
});


/**
 * GamepadProvider
 * 
 * Olyan komponens, ami elérhetővé teszi 
 * a state objektumot és state módosító funkciót
 * 
 * @param props komponens tulajdonságai
 * @returns 
 */
export const GamepadProvider = (props: Props) => {
    const [gamepadState, dispatch] = useReducer(reducer, initialState);
    const setGamepadState = (type: any, payload: any) => dispatch({ type, payload })


    useEffect(() => {
        //Gamepad API listener inicializálás
        window.addEventListener('gamepadconnected', (event: any) => {
            console.log('gamepad connected')
            return gamepadIndex = event.gamepad.index;
        });

        //Kontroller gomblenyomás ellenörzése (x milisec)
        setInterval(() => {
            //Ha található csatlakoztatott kontroller
            if (gamepadIndex !== undefined) {
                //Kontroller kiválasztása
                const myGamepad: any = navigator.getGamepads()[gamepadIndex];

                //Gomblenyomás ellenörzése
                myGamepad.buttons.map((e: any) => e.pressed).forEach((isPressed: any, buttonIndex: any) => {
                    if (isPressed) {
                        setGamepadState(actionTypes.gamepad.SET_PRESSED, buttonIndex);
                        console.log(buttonIndex);
                    }
                })
            }
        }, sensitivity);
    }, []);

    return (
        <GamepadContext.Provider value={{
            gamepadState,
            setGamepadState
        }}>
            {props.children}
        </GamepadContext.Provider>
    )
}