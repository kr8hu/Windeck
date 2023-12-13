//React
import { useContext } from 'react';

//Ctx
import { AppContext } from '../../context/App';

//Components
import Library from '../../components/Library';
import Template from '../../components/Template';

//Local
import menuItems from './menuItems';

//Styles
import styles from './Home.module.css';


/**
 * Home
 * 
 * @returns 
 */
function Home() {
    //Ctx
    const { appState } = useContext(AppContext);


    return (
        <div className={styles.container}>
            <Template
                menuItems={menuItems}>
                {appState.library.length !== 0 ?
                    <Library />
                    :
                    <span className={styles.placeholder}>
                        A könyvtárad jelenleg üres.
                    </span>
                }
            </Template>
        </div>
    )
}


export default Home;
