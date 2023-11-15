//Router
import { useNavigate } from 'react-router-dom';

//Components
import Button from '../../../components/Button';

//Styles
import styles from './Option.module.css';


/**
 * Props
 * 
 * komponens tulajdonságainak meghatározása
 */
interface Props {
    data: any;
}


/**
 * Option
 * 
 * Beállítási lehetőséget megjelenítő komponens
 * 
 * @param props 
 * @returns 
 */
function Option(props: Props) {
    //Hook
    const navigator = useNavigate();


    return (
        <div className={styles.container} data-disabled={props.data.disabled}>
            <span className={styles.title}>
                {props.data.title}
            </span>

            <Button
                text="Megnyitás"
                onClick={() => navigator(props.data.path)} />
        </div>
    )
}

export default Option;