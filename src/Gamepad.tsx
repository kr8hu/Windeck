//React
import React, { useContext, useEffect } from "react";

//Context
import { GamepadContext } from "./context/Gamepad";



/**
 * Props
 * 
 * Komponens tulajdonságainak meghatározása
 */

interface Props {
    children: React.ReactNode;
}


/**
 * Gamepad
 * 
 * @param props 
 * @returns 
 */
function Gamepad(props: Props) {
    //Context
    const { gamepadState } = useContext(GamepadContext);


    //Gamepad Effect
    useEffect(() => {
        if (gamepadState.keymap === undefined) return;

        gamepadState.keymap.forEach((item: any) => {
            if (item.key === gamepadState.pressed) {
                item.action();
            }
        });
    });


    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    )
}

export default Gamepad;