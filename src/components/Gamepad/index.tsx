//React
import {
    useState,
    useContext,
    useEffect
} from "react";

//Ctx
import { AppContext } from "../../context/App";

//React Router
import { useNavigate } from "react-router-dom";


let gamepadIndex: any;
let timeout: any;
const sensitivity = 150;


/**
 * Gamepad
 * 
 * @param props 
 * @returns 
 */
function Gamepad() {
    //Hooks
    const navigate = useNavigate();


    //Context
    const { appState } = useContext(AppContext);


    //States 
    const [pressed, setPressed] = useState<any>(undefined);


    //Effect
    useEffect(() => {
        window.addEventListener('gamepadconnected', (e: any) => {
            return gamepadIndex = e.gamepad.index;
        });

        setInterval(() => {
            if (gamepadIndex !== undefined) {
                const gamepad: any = navigator.getGamepads()[gamepadIndex];

                gamepad.buttons.map((e: any) => e.pressed)
                    .forEach((isPressed: any, buttonIndex: any) => {
                        if (isPressed) {
                            setPressed(buttonIndex);
                        }
                    });
            }
        }, sensitivity);


        return () => {
            window.removeEventListener('gamepadconnected', () => { });
        }
    }, []);


    useEffect(() => {
        if (pressed === undefined) return;

        appState.gamepadLayout.find((i: any) => {
            if (i.button === pressed) {
                if (i.function) {
                    i.function();
                    setPressed(undefined);
                    return;
                }

                clearTimeout(timeout);

                timeout = setTimeout(() => {
                    navigate(i.route, { state: i.state });
                }, 750);

            }
        });

        setPressed(undefined);
    }, [pressed, appState]);

    return null;
}

export default Gamepad;
