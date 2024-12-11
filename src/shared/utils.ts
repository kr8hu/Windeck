//Assets
import btn_option from '../assets/images/buttons/fixed/options.png';
import btn_a from '../assets/images/buttons/A.png';
import btn_b from '../assets/images/buttons/B.png';
import btn_x from '../assets/images/buttons/X.png';
import btn_y from '../assets/images/buttons/Y.png';
import btn_L1 from '../assets/images/buttons/fixed/L1.png';
import btn_R1 from '../assets/images/buttons/fixed/R1.png';
import btn_left from '../assets/images/buttons/left.png';
import btn_right from '../assets/images/buttons/right.png';
import btn_up from '../assets/images/buttons/up.png';
import btn_down from '../assets/images/buttons/down.png';
import btn_directions from '../assets/images/buttons/directions.png';

//Shared
import { gamepadButtons } from "./const";


/**
 * sortByProperty
 * 
 * A kiválasztott adat alapján rendezi az objekutmokból álló tömböt.
 * 
 * @param property az az adat, ami alapján kerül rendezésre a tömb
 * @returns 
 */
export function sortByProperty(property: string): (a: any, b: any) => number {
    var sortOrder = 1;

    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a: any, b: any) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}


/**
 * getGamepadButton
 * 
 * Egy kontroller gombjához tartozó ikonnal visszatérő funkció
 * 
 * @param key gomb azonosítója
 */
export function getGamepadButton(key: number): string | undefined {
    switch (key) {
        case gamepadButtons.OPTIONS: return btn_option;
        case gamepadButtons.A: return btn_a;
        case gamepadButtons.B: return btn_b;
        case gamepadButtons.X: return btn_x;
        case gamepadButtons.Y: return btn_y;
        case gamepadButtons.L1: return btn_L1
        case gamepadButtons.R1: return btn_R1;
        case gamepadButtons.LEFT: return btn_left;
        case gamepadButtons.RIGHT: return btn_right;
        case gamepadButtons.UP: return btn_up;
        case gamepadButtons.DOWN: return btn_down;
        case gamepadButtons.DIRECTIONS: return btn_directions;
        default: return undefined
    }
}


/**
 * uint8ArrayToBase64
 * 
 * Uint8Array Base64 konverzió
 * 
 * @param uint8Array 
 * @returns 
 */
export function uint8ArrayToBase64(uint8Array: Uint8Array): string {
    let binary = '';

    uint8Array.forEach((byte) => {
        binary += String.fromCharCode(byte);
    });

    return btoa(binary);
}