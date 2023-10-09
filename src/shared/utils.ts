//Assets
import btn_option from '../assets/images/buttons/options.png';
import btn_cross from '../assets/images/buttons/cross.png';
import btn_circle from '../assets/images/buttons/circle.png';
import btn_square from '../assets/images/buttons/square.png';
import btn_triangle from '../assets/images/buttons/triangle.png';
import btn_L1 from '../assets/images/buttons/L1.png';
import btn_R1 from '../assets/images/buttons/R1.png';

//Shared
import { GAMEPAD_KEYS } from "./const";


/**
 * sortByProperty
 * 
 * A megadott property alapján növekvő sorrendbe rendezi az array elemeit
 * 
 * @param property tulajdonság ami alapján rendezésre kerül az array
 * @returns 
 */
export function sortByProperty(property: any) {
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
 * getGamepadKeyImage
 * 
 * Visszatér a megadott gomb ikonjával
 * 
 * @param key gamepad gomb
 */
export function getGamepadKeyImage(key: any) {
    switch (key) {
        case GAMEPAD_KEYS.options: return btn_option;
        case GAMEPAD_KEYS.cross: return btn_cross;
        case GAMEPAD_KEYS.circle: return btn_circle;
        case GAMEPAD_KEYS.square: return btn_square;
        case GAMEPAD_KEYS.triangle: return btn_triangle;
        case GAMEPAD_KEYS.L1: return btn_L1
        case GAMEPAD_KEYS.R1: return btn_R1;
        default: return null
    }
}
