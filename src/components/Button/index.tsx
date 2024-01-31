//Styles
import styles from './Button.module.css';


/**
 * Props
 * 
 */
interface Props {
    className?: any;
    text: string;
    disabled?: boolean;
    onClick?: any;
}


/**
 * Button
 * 
 * @param props 
 * @returns 
 */
function Button(props: Props) {
    /**
     * onClick
     * s
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
