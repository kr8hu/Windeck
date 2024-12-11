//React
import { ReactNode } from 'react';

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
function Setting({ data }: Props): ReactNode {
    /**
     * Hooks
     * 
     */
    const navigate = useNavigate();


    return (
        <div className={styles.container} data-disabled={data.disabled}>
            <span className={styles.title}>
                {data.title}
            </span>

            <Button
                text="Megnyitás"
                onClick={() => navigate(data.path)} />
        </div>
    )
}

export default Setting;