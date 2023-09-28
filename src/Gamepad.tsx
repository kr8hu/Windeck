//React
import React, { useContext, useEffect } from "react";

//Context
import { GamepadContext } from "./context/Gamepad";


interface Props {
    children: React.ReactNode;
}
function Gamepad(props: Props) {
    //Context
    const { gamepadState } = useContext(GamepadContext);


    //Gamepad Effect
    useEffect(() => {
        //Ha még nincs betöltve a keymap
        if (gamepadState.keymap === undefined) return;

        //Lenyomott gombhoz társított funkció
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