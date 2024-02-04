//Components
import Pill from '../../../../components/Pill';

//Shared
import { gamepadButtons } from '../../../../shared/const';

//Styles
import styles from './Operations.module.css';


/**
 * Operations
 * 
 * 
 * @returns 
 */
function Operations() {
    //Variables
    const options = [
        {
            icon: gamepadButtons.A,
            text: "Indítás",
            
        },
        {
            icon: gamepadButtons.X,
            text: "Szerkesztés",
        }
    ]


    return options.map((option: any, idx: number) => {
        return (
            <Pill
                key={idx}
                icon={option.icon}
                text={option.text}
                className={styles.pill} />
        )
    })
}

export default Operations;
