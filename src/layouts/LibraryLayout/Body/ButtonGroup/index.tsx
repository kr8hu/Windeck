//React
import { useContext } from 'react';

//React Router
import { useNavigate } from 'react-router-dom';

//Ctx
import { AppContext } from '../../../../context/App';

//Components
import Button from '../../../../components/Button';

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


    //Hooks
    const navigate = useNavigate();


    //Variables
    const buttons = [
        {
            text: "Indítás",
            path: "/launch",
            state: {
                path: appState.library[appState.selected].path,
            }
        },
        {
            text: "Szerkesztés",
            path: "/editor",
            state: {
                id: appState.selected,
                name: appState.library[appState.selected].name,
                image: appState.library[appState.selected].image,
                path: appState.library[appState.selected].path,
            }
        }
    ]


    return buttons.map((button: any, idx: number) => {
        return (
            <Button
                key={idx}
                className={styles.button}
                text={button.text}
                onClick={() => navigate(button.path, { state: button.state })} />
        )
    })
}

export default ButtonGroup;
