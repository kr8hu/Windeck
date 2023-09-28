//Styles
import styles from './Button.module.css';


interface Props {
    className?: any;
    text: string;
    disabled?: boolean;
    onClick: any;
}
function Button(props: Props) {
    return (
        <button
            className={`${styles.container} ${props.className}`}
            data-disabled={props.disabled}
            onClick={() => props.onClick ? props.onClick() : null}>
            {props.text}
        </button>
    )
}   

export default Button;
