//Hooks
import useApp from '../../../hooks/useApp';

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
    const { appState } = useApp();


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