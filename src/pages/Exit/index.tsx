//React
import {
    useEffect,
    useState
} from 'react';

//Tauri
import { exit } from '@tauri-apps/api/process';

//Router
import { useNavigate } from 'react-router-dom';

//Components
import Button from '../../components/Button';

//Layouts
import ActionLayout from '../../layouts/ActionLayout';


let interval: any;


/**
 * Exit
 * 
 * @returns 
 */
function Exit() {
    //Hook
    const navigate = useNavigate();


    //State
    const [counter, setCounter] = useState<number>(10);


    useEffect(() => {
        interval = setInterval(() => {
            setCounter((current: number) => current - 1);
        }, 1000);

        return () => {
            setCounter(10);
            clearInterval(interval);
        }
    }, []);


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
