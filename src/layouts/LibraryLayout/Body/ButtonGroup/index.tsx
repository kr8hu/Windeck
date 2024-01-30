//React
import { useContext } from 'react';

//React Router
import { useNavigate } from 'react-router-dom';

//Ctx
import { AppContext } from '../../../../context/App';

//Components
import Button from '../../../../components/Button';
import Pill from '../../../../components/Pill';

//Shared
import { GAMEPAD_BUTTONS } from '../../../../shared/const';

//Styles
import styles from './ButtonGroup.module.css';


/**
 * ButtonGroup
 * 
 * 
 * @returns 
 */
function ButtonGroup() {
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
        <>
            <Pill
                icon={GAMEPAD_BUTTONS.A}
                text="Start" />

            <div className={styles.divider} />

            <Button
                className={styles.button}
                text="Szerkesztés"
                onClick={openEditor} />
        </>
    )
}

export default ButtonGroup;
