//React
import { useContext } from 'react';

//Context
import { AppContext } from '../../../context/App';

//Components
import Cover from './Cover';
import Operations from './Operations';

//Styles
import styles from './Body.module.css';


/**
 * Body (LibraryLayout)
 * 
 * @returns 
 */
function Body() {
    //Context
    const { appState } = useContext(AppContext);


    /**
     * renderOperations
     * 
     */
    const renderOperations = appState.library.length !== 0 && <Operations />;


    /**
     * renderCover
     * 
     */
    const renderCover = appState.library.length !== 0 && <Cover />;


    return (
        <div className={styles.row}>
            <div className={styles.col}>

            </div>
            <div className={styles.col}>
                <div className={styles.wrapper}>
                    {renderCover}
                    {renderOperations}
                </div>
            </div>
            <div className={styles.col}>

            </div>
        </div>
    )
}

export default Body;