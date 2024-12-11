//React
import { ReactNode } from 'react';

//Components
import LibraryLayout from '../../layouts/LibraryLayout';

//Styles
import styles from './Home.module.css';


/**
 * Home
 * 
 * @returns 
 */
function Home(): ReactNode {
    return (
        <div className={styles.container}>
            <LibraryLayout />
        </div>
    )
}


export default Home;
