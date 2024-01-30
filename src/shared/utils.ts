//Assets
import btn_option from '../assets/images/buttons/fixed/options.png';
import btn_cross from '../assets/images/buttons/cross.png';
import btn_circle from '../assets/images/buttons/circle.png';
import btn_square from '../assets/images/buttons/square.png';
import btn_triangle from '../assets/images/buttons/triangle.png';
import btn_L1 from '../assets/images/buttons/fixed/L1.png';
import btn_R1 from '../assets/images/buttons/fixed/R1.png';

//Shared
import { GAMEPAD_BUTTONS } from "./const";


/**
 * sortByProperty
 * 
 * Egy adott tulajdonság alapján rendezi az objekutmokból álló tömböt.
 * 
 * @param property az a tulajdonság, ami alapján kerül rendezésre a tömb
 * @returns 
 */
export function sortByProperty(property: string) {
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
 * A kontroller gombjához tartozó képet ad vissza.
 * 
 * @param key gomb azonosítója
 */
export function getGamepadButton(key: number) {
    switch (key) {
        case GAMEPAD_BUTTONS.options: return btn_option;
        case GAMEPAD_BUTTONS.A: return btn_cross;
        case GAMEPAD_BUTTONS.B: return btn_circle;
        case GAMEPAD_BUTTONS.X: return btn_square;
        case GAMEPAD_BUTTONS.Y: return btn_triangle;
        case GAMEPAD_BUTTONS.L1: return btn_L1
        case GAMEPAD_BUTTONS.R1: return btn_R1;
        default: return undefined
    }
}
