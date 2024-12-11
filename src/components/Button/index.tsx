//Styles
import { ReactNode } from 'react';
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
function Button({className, text, disabled, onClick}: Props): ReactNode {
    /**
     * onClick
     * 
     * @returns 
     */
    const onClickHandler = () => {
        if (disabled) return;
        if (onClick) onClick();
    }


    return (
        <button
            className={`${styles.container} ${className}`}
            data-disabled={disabled}
            onClick={onClickHandler}>
            {text}
        </button>
    )
}

export default Button;
