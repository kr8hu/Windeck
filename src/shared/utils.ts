//Assets
import btn_option from '../assets/images/buttons/fixed/options.png';
/* import btn_cross from '../assets/images/buttons/cross.png';
import btn_circle from '../assets/images/buttons/circle.png';
import btn_square from '../assets/images/buttons/square.png';
import btn_triangle from '../assets/images/buttons/triangle.png'; */
import btn_a from '../assets/images/buttons/A.png';
import btn_b from '../assets/images/buttons/B.png';
import btn_x from '../assets/images/buttons/X.png';
import btn_y from '../assets/images/buttons/Y.png';
import btn_L1 from '../assets/images/buttons/fixed/L1.png';
import btn_R1 from '../assets/images/buttons/fixed/R1.png';


//Shared
import { gamepadButtons } from "./const";


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
        case gamepadButtons.options: return btn_option;
        case gamepadButtons.A: return btn_a;
        case gamepadButtons.B: return btn_b;
        case gamepadButtons.X: return btn_x;
        case gamepadButtons.Y: return btn_y;
        case gamepadButtons.L1: return btn_L1
        case gamepadButtons.R1: return btn_R1;
        default: return undefined
    }
}
