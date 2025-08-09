//Hooks
import useApp from '../../hooks/useApp';
import useInput from '../../hooks/useInput';

//Components
import Keyboard from '../../components/Keyboard';

//Styles
import styles from './InputLayout.module.css';


/**
 * InputLayout
 * 
 * @returns 
 */
function InputLayout() {
    /**
     * Hooks
     * 
     */
    const { appState } = useApp();
    const { inputValue } = useInput();


    return (
        <div className={styles.container} data-active={appState.keyboard}>
            <div className={styles.row}>
                <div className={styles.col}>
                    <input
                        id="preview_value"
                        name="preview_value"
                        type="text"
                        value={inputValue}
                        className={styles.input} />
                </div>
                <div className={styles.col}>
                    <Keyboard />
                </div>
            </div>
        </div>
    )
}

export default InputLayout;
