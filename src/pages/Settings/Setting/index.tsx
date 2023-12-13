//Router
import { useNavigate } from 'react-router-dom';

//Components
import Button from '../../../components/Button';

//Styles
import styles from './Setting.module.css';


/**
 * Props
 * 
 */
interface Props {
    data: any;
}


/**
 * Setting
 * 
 * Beállítást megjelenítő komponens
 * 
 * @param props 
 * @returns 
 */
function Setting(props: Props) {
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

export default Setting;