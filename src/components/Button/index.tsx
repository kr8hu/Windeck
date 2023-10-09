//Styles
import styles from './Button.module.css';


/**
 * Props
 * 
 * Komponens tulajdonságainak meghatározása
 */
interface Props {
    className?: any;
    text: string;
    disabled?: boolean;
    onClick: any;
}


/**
 * Button
 * 
 * Gomb komponens
 * 
 * @param props komponens tulajdonságai
 * @returns 
 */
function Button(props: Props) {
    /**
     * onClick
     * 
     * Kattintásra lefutó funkció
     * @returns 
     */
    const onClick = () => {
        if (props.disabled) return;
        if (props.onClick) props.onClick();
    }


    return (
        <button
            className={`${styles.container} ${props.className}`}
            data-disabled={props.disabled}
            onClick={onClick}>
            {props.text}
        </button>
    )
}

export default Button;
