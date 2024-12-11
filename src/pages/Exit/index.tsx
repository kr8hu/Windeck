//React
import {
    ReactNode,
    useEffect,
    useRef,
    useState
} from 'react';

//Tauri
import { exit } from '@tauri-apps/plugin-process';

//Router
import { useNavigate } from 'react-router-dom';

//Components
import Button from '../../components/Button';

//Layouts
import ActionLayout from '../../layouts/ActionLayout';


/**
 * Exit
 * 
 * @returns 
 */
function Exit(): ReactNode {
    /**
     * Hooks
     * 
     */
    const navigate = useNavigate();


    /**
     * States
     * 
     */
    const [counter, setCounter] = useState<number>(5);


    /**
     * Refs
     * 
     */
    const intervalRef = useRef<any>(null);


    /**
     * useEffect
     * 
     * Visszaszámlálás indítás a konponens mountolásakor
     */
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCounter((current: number) => current - 1);
        }, 1000);

        return () => {
            setCounter(5);
            clearInterval(intervalRef.current);
        }
    }, []);


    /**
     * useEffect
     * 
     * counter vizsgálata és 0 érték esetén az alkalmazás bezárása
     */
    useEffect(() => {
        if (counter === 0) exit();
    }, [counter]);


    return (
        <ActionLayout
            title="Kilépés az alkalmazásból"
            text={`Az alkalmazás bezárása ${counter} másodperc múlva.`}>

            <Button
                text="Folyamat megszakítása"
                onClick={() => navigate(-1)} />
        </ActionLayout>
    )
}

export default Exit;
