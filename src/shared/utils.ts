//Assets
import btn_option from '../assets/images/buttons/options.png';
import btn_cross from '../assets/images/buttons/cross.png';
import btn_circle from '../assets/images/buttons/circle.png';
import btn_square from '../assets/images/buttons/square.png';
import btn_triangle from '../assets/images/buttons/triangle.png';
import btn_L1 from '../assets/images/buttons/L1.png';
import btn_R1 from '../assets/images/buttons/R1.png';

//Shared
import { GAMEPAD_KEYS, LAUNCHERS } from "./const";


/**
 * A megadott property alapján növekvő sorrendbe rendezi az array elemeit
 * @param property 
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
 * Visszatér a megadott gomb ikonjával
 * @param key 
 */
export function getGamepadKeyIcon(key: any) {
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

export function getLauncherData(id: number) {
    switch (id) {
        case 0: return {
            name: LAUNCHERS.steam.name,
            image: LAUNCHERS.steam.logo,
        }
        case 1: return {
            name: LAUNCHERS.ea.name,
            image: LAUNCHERS.ea.logo,
        }
        case 2: return {
            name: LAUNCHERS.ubisoft.name,
            image: LAUNCHERS.ubisoft.logo,
        }
        case 3: return {
            name: LAUNCHERS.rockstar.name,
            image: LAUNCHERS.rockstar.logo,
        }
        case 4: return {
            name: LAUNCHERS.epic.name,
            image: LAUNCHERS.epic.logo,
        }
        case 5: return {
            name: LAUNCHERS.gog.name,
            image: LAUNCHERS.gog.logo,
        }
        default: return {
            name: LAUNCHERS.default.name,
            image: LAUNCHERS.default.logo,
        }
    }
}