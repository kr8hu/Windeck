//React
import {
    CSSProperties,
    ReactNode,
    useContext
} from 'react';

//Context
import { AppContext } from '../../context/App';

//Components
import Pill from '../Pill';

//Interfaces
import IGamepadLayout from '../../interfaces/GamepadLayout';

//Shared
import { sortByProperty } from '../../shared/utils';

//Styles
import styles from './GamepadLayout.module.css';


/**
 * Props
 * 
 */
interface Props {
    className?: any;
    rows?: number;
}


/**
 * GamepadLayout
 * 
 * @returns 
 */
function GamepadLayout({ className, rows }: Props): ReactNode {
    /**
     * Context
     * 
     */
    const { appState } = useContext(AppContext);


    /**
     * columnStyles
     * 
     */
    const columnStyles: CSSProperties = { height: rows ? `calc(100% / ${rows})` : '100%' }


    /**
     * renderGamepadLayout
     * 
     */
    const renderGamepadLayout = (): ReactNode => {
        const sortedGamepayLayout = appState.gamepadLayout.sort(sortByProperty('button'));

        return sortedGamepayLayout.map((gl: IGamepadLayout, idx: number) => {
            return (
                <div 
                    key={idx} 
                    className={styles.col}
                    data-visibility={gl.visibility} 
                    style={columnStyles}>
                    <Pill
                        icon={gl.button}
                        text={gl.name}
                        className={styles.pill} />
                </div>
            )
        })
    }


    return (
        <div className={`${styles.container} ${className}`}>
            <div className={styles.row}>
                {renderGamepadLayout()}
            </div>
        </div>
    )
}

export default GamepadLayout;
