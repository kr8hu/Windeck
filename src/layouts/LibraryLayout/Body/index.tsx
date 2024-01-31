//React
import { useContext } from 'react';

//Ctx
import { AppContext } from '../../../context/App';

//Components
import ButtonGroup from './ButtonGroup';

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
     * renderPreview
     * 
     * @returns 
     */
    const renderPreview = () => {
        return (
            <>
                <img
                    className={styles.cover}
                    src={appState.library[appState.selected]?.image}
                    alt="cover"
                />
                <span className={styles.title}>
                    {appState.library[appState.selected]?.name}
                </span>
            </>
        )
    }


    return (
        <div className={styles.row}>
            <div className={styles.col}>

            </div>
            <div className={styles.col}>
                <div className={styles.data}>
                    {appState.library.length !== 0 && renderPreview()}
                </div>
            </div>
            <div className={styles.col}>
                {appState.library.length !== 0 && <ButtonGroup />}
            </div>
            <div className={styles.col}>

            </div>
        </div>
    )
}

export default Body;
