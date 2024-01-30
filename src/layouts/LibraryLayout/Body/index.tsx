//React
import { useContext } from 'react';

//React Router
import { useNavigate } from 'react-router-dom';

//Ctx
import { AppContext } from '../../../context/App';

//Styles
import styles from './Body.module.css';
import Button from '../../../components/Button';


/**
 * Body
 * 
 * Tartalmi részt megjelenítő komponens
 * 
 * @returns 
 */
function Body() {
    //Context
    const { appState } = useContext(AppContext);

    
    //Variables
    const navigate = useNavigate();



    /**
     * openEditor
     * 
     * Szerkesztő megnyitása az adatokkal
     */
    const openEditor = () => {
        navigate('/editor', {
            state: {
                id: appState.selected,
                name: appState.library[appState.selected].name,
                image: appState.library[appState.selected].image,
                path: appState.library[appState.selected].path,
            }
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.col}>

                </div>
                <div className={styles.col}>
                    <div className={styles.data}>
                        <img
                            className={styles.cover}
                            src={appState.library[appState.selected].image}
                            alt="cover"
                        />
                        <span className={styles.title}>
                            {appState.library[appState.selected].name}
                        </span>
                    </div>
                </div>
                <div className={styles.col}>
                    <Button className={styles.button} text="Indítás" />
                    <Button 
                        className={styles.button} 
                        text="Szerkesztés" 
                        onClick={openEditor}/>
                </div>
                <div className={styles.col}>

                </div>
            </div>
        </div>
    )
}

export default Body;
