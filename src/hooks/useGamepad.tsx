//React
import {
    useState,
    useEffect,
    useCallback,
    useRef,
} from "react";

//Hooks
import useApp from "./useApp";

//React router
import { useNavigate } from "react-router-dom";

//Interfaces
import IGamepadLayout from "../interfaces/GamepadLayout";

//Shared
import { actionTypes } from "../shared/const";


/**
 * useGamepad
 * 
 * @returns 
 */
function useGamepad(): any {
    /**
     * Context
     * 
     */
    const { setAppState } = useApp();


    /**
     * States
     * 
     */
    const [pressed, setPressed] = useState<any>(null);
    const [layout, setLayout] = useState<any>(null);


    /**
     * Refs
     * 
     */
    const gamepadIndexRef = useRef<any>(undefined);
    const intervalRef = useRef<any>(null);
    const timeoutRef = useRef<any>(null);


    /**
     * Hooks
     * 
     */
    const navigate = useNavigate();


    /**
     * gamepadSensitivity
     * 
     * Kontroller gomblenyomás-ellenörzés gyakoriságának ideje (ms)
     */
    const gamepadSensitivity = 125;


    /**
     * setGamepadLayout
     * 
     * Gamepad gombkiosztás módosítása
     */
    const setGamepadLayout = useCallback((newLayout: IGamepadLayout[]): void => {
        setLayout(newLayout);
        setAppState(actionTypes.app.SET_GAMEPAD_LAYOUT, newLayout);

        console.log("Kontroller gombkiosztás frissítve:", newLayout);
    }, []);


    /**
     * handleGamepadEvents
     * 
     * Gamepad események
     */
    const handleGamepadEvents = useCallback((e: any): void => {
        gamepadIndexRef.current = e.gamepad.index;

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            if (gamepadIndexRef.current !== undefined) {
                const gamepad: any = navigator.getGamepads()[gamepadIndexRef.current];

                if (gamepad) {
                    gamepad.buttons
                        .map((e: any) => e.pressed)
                        .forEach((isPressed: any, buttonIndex: any) => {
                            if (isPressed) {
                                setPressed(buttonIndex);
                            }
                        });
                }
            }
        }, gamepadSensitivity);

        console.log("Kontroller észlelve: ", e);
    }, []);


    /**
     * checkConnectedGamepads
     * 
     * Csatlakoztatott kontrollerek ellenörzése
     */
    const checkConnectedGamepads = useCallback((): void => {
        const gamepads = navigator.getGamepads();

        for (let i = 0; i < gamepads.length; i++) {
            if (gamepads[i]) {
                handleGamepadEvents({ gamepad: gamepads[i] });
                break;
            }
        }
    }, [handleGamepadEvents]);


    /**
     * useEffect
     * 
     * Eseményfigyelők
     */
    useEffect(() => {
        window.addEventListener("gamepadconnected", handleGamepadEvents);
        window.addEventListener("gamepaddisconnected", handleGamepadEvents);

        // Ellenőrizzük manuálisan a csatlakoztatott gamepadot mountoláskor
        checkConnectedGamepads();

        return () => {
            window.removeEventListener("gamepadconnected", handleGamepadEvents);
            window.removeEventListener("gamepaddisconnected", handleGamepadEvents);

            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [handleGamepadEvents, checkConnectedGamepads]);


    /**
     * useEffect
     * 
     * A layout (kiosztás) és pressed (lenyomott gomb) ellenörzése
     */
    useEffect(() => {
        if (layout === null || pressed === null) return;

        layout.find((l: any) => {
            if (l.button === pressed) {
                if (l.function) {
                    l.function();
                    setPressed(null);
                }

                if (l.route) {
                    clearTimeout(timeoutRef.current);

                    timeoutRef.current = setTimeout(() => {
                        navigate(l.route, { state: l.state });
                    }, 750);
                }
            }
        });

        setPressed(null);
    }, [layout, pressed, navigate]);


    return {
        layout,
        setLayout: setGamepadLayout,
    };
}

export default useGamepad;
