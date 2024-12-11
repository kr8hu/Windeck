//Components
import GamepadLayout from '../../../../components/GamepadLayout';

//Styles
import styles from './Operations.module.css';


/**
 * Operations
 * 
 * 
 * @returns 
 */
function Operations() {
    return (
        <div className={styles.container}>
            <GamepadLayout className={styles.gamepadLayout}/>
        </div>
    )
}

export default Operations;
