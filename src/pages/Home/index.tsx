//Components
import LibraryLayout from '../../layouts/LibraryLayout';

//Styles
import styles from './Home.module.css';


/**
 * Home
 * 
 * @returns 
 */
function Home() {
    return (
        <div className={styles.container}>
            <LibraryLayout />
        </div>
    )
}


export default Home;
