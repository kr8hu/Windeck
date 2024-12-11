export default interface IGamepadLayout {
    name: string;
    button: number; 
    route: undefined | string | number; 
    state: any; 
    function: any;
    visibility?: boolean;
}