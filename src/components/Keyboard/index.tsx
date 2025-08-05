//React
import React, {
    useContext,
    useRef,
    useState
} from 'react';

//Context
import { AppContext } from '../../context/App';

//Local
import {
    keys,
    leftSideKeys,
    rightSideKeys
} from './const';

//Shared
import { actionTypes } from '../../shared/const';

//Styles
import styles from './Keyboard.module.css';


/**
 * Props
 * 
 */
interface Props {
    onKeyPress?: (key: string) => void;
}


/**
 * Keyboard
 * 
 */
function Keyboard({ onKeyPress }: Props) {
    /**
     * Context
     * 
     */
    const { setAppState } = useContext(AppContext);


    /**
     * Ref
     * 
     */
    const hiddenInputRef = useRef<HTMLInputElement>(null);


    /**
     * States
     * 
     */
    const [isUppercase, setIsUppercase] = useState<boolean>(false);


    /**
     * centerButtonLabel
     * 
     */
    const centerButtonLabel = (key: string) => isUppercase ? key.toUpperCase() : key.toLowerCase();


    /**
     * rightSideButtonLabel
     * 
     */
    const rightSideButtonLabel = (key: string) => key === "close" ? "Bezárás".toUpperCase() : key.toUpperCase();


    /**
     * inputHandler
     * 
     */
    const inputHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
        const key = e.currentTarget.value;

        if (hiddenInputRef.current) {
            hiddenInputRef.current.value += key;
        }

        if (onKeyPress) {
            onKeyPress(key);
        }
    }


    /**
     * sliceValue
     * 
     */
    const sliceValue = (): void => {
        if (hiddenInputRef.current) {
            hiddenInputRef.current.value = hiddenInputRef.current.value.slice(0, -1);
        }
    }


    /**
     * closeKeyboard
     * 
     */
    const closeKeyboard = (): void => {
        setAppState(actionTypes.app.SET_KEYBOARD, false);

    }


    /**
     * switchCapsLock
     * 
     */
    const switchCapsLock = (): void => {
        setIsUppercase((prev: boolean) => !prev)
    }


    /**
     * operationHandler
     * 
     */
    const operationHandler = (key: string): any => {
        switch (key) {
            case "backspace": return sliceValue();
            case "caps lock": return switchCapsLock();
            case "close": return closeKeyboard();
            case "enter": return closeKeyboard();
            default: return null;
        }
    }


    /**
     * renderLeftSideButtons
     */
    const renderLeftSideButtons = (): React.ReactNode[] => {
        return leftSideKeys.map((key: string, idx: number) => {
            return (
                <button
                    key={idx}
                    className={styles.key}
                    onClick={() => operationHandler(key)}>
                    {key.toUpperCase()}
                </button>
            )
        })
    }


    /**
     * renderMiddleButtons
     * 
     * @returns 
     */
    const renderMiddleButtons = (): React.ReactNode[] => {
        return keys.map((key: string, idx: number) => {
            return (
                <button
                    key={idx}
                    className={styles.key}
                    value={isUppercase ? key.toUpperCase() : key.toLowerCase()}
                    onClick={inputHandler}>
                    {centerButtonLabel(key)}
                </button>
            )
        })
    }


    /**
     * renderRightSideKeys
     * 
     * @returns 
     */
    const renderRightSideKeys = (): React.ReactNode[] => {
        return rightSideKeys.map((key: string, idx: number) => {
            return (
                <button
                    key={idx}
                    className={styles.key}
                    onClick={() => operationHandler(key)}>
                    {rightSideButtonLabel(key)}
                </button>
            )
        })
    }


    return (
        <div className={styles.container}>
            <div className={styles.row}>
                {/* Bal oldali gombok */}
                <div className={styles.col}>
                    <div className={styles.keys}>
                        {renderLeftSideButtons()}
                    </div>
                </div>
                {/* Középső gombok */}
                <div className={styles.col}>
                    <div className={styles.keys}>
                        {renderMiddleButtons()}
                    </div>
                </div>
                {/* Jobb oldali gombok */}
                <div className={styles.col}>
                    <div className={styles.keys}>
                        {renderRightSideKeys()}
                    </div>
                </div>
            </div>
            <input id="keyboard_value" type="hidden" ref={hiddenInputRef} />
        </div>
    )
}

export default Keyboard;
