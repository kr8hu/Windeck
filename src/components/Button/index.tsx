//Styles
import styles from './Button.module.css';


interface Props {
    className?: any;
    text: string;
    disabled?: boolean;
    onClick: any;
}
function Button(props: Props) {

    
    const onClick = () => {
        if(props.disabled) return;
        if(props.onClick) props.onClick();
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
