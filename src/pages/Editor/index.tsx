//React
import { useContext, useEffect, useState } from 'react';

//useSound
import useSound from 'use-sound';

//Tauri
import { confirm, message, open } from '@tauri-apps/api/dialog';
import { appWindow } from '@tauri-apps/api/window';
import { invoke } from '@tauri-apps/api';

//Ctx
import { AppContext } from '../../context/App';

//Components
import Button from '../../components/Button';
import Template from '../../components/Template';

//Shared
import { actionTypes } from '../../shared/const';

//Assets
import checkmark from '../../assets/images/checkmark.png';
import alertSound from '../../assets/sounds/alert.mp3';
import errorSound from '../../assets/sounds/error.mp3';

//Styles
import styles from './Editor.module.css';


/**
 * Editor
 * 
 * @returns 
 */
function Editor() {
    //Ctx
    const { setAppState } = useContext(AppContext);

    //State
    const [base64, setBase64] = useState<any>('');
    const [data, setData] = useState<any>({
        exe: '',
        img: '',
        name: ''
    });

    //Sound
    const [playAlertSound] = useSound(alertSound);
    const [playErrorSound] = useSound(errorSound);


    //Menu Items
    const menuItems = [
        {
            label: 'Vissza',
            path: -1
        }
    ];


    //Setting options
    const settings = [
        {
            title: "Indítás helye",
            value: data.exe,
            type: "button",
            placeholder: "Kiválasztás",
            onClick: () => setExecutable()
        },
        {
            title: "Borítókép",
            value: data.img,
            type: "button",
            placeholder: "Kiválasztás",
            onClick: () => setCoverImage()
        },
        {
            title: "Program neve",
            value: data.name,
            type: "input",
            onClick: (value: any) => setApplicationName(value)
        },
        {
            value: '',
            type: "button",
            placeholder: "Hozzáadás",
            onClick: () => validate()
        }
    ];


    //Tauri listener aktiválása
    useEffect(() => {
        addTauriEventListener();
    }, []);


    //base64 és data hatása a komponensre
    useEffect(() => {
        if (base64.length === 0) return;

        createLibraryEntry(data, base64);
    }, [base64, data]);



    /**
     * addTauriListener
     * 
     * Tauri eseményfigyelő létrehozása
     */
    const addTauriEventListener = async () => {
        await appWindow.listen(
            'base64result',
            ({ event, payload }: { event: any, payload: { result: any } }) => {
                console.log(event);
                setBase64(payload.result);
            }
        );
    }


    /**
     * render
     * 
     * input renderelése
     * @param data 
     * 
     * @returns 
     */
    const render = (data: any) => {
        switch (data.type) {
            //Button
            case "button": {
                if (data.value.length !== 0) {
                    return (<img className={styles.checkmark} src={checkmark} />)
                }
                else {
                    return (<Button
                        className={styles.button}
                        text={data.placeholder}
                        onClick={data.onClick} />)
                }
            }
            //Input
            case "input": {
                return (
                    <input
                        className={styles.input}
                        type="text"
                        value={data.value}
                        onChange={(e: any) => data.onClick(e.target.value)} />
                )
            }
            default: return null;
        }
    }


    /**
     * Ellenörzi az adatokat
     */
    const validate = () => {
        //Üres mező vizsgálat
        let status = true;

        for (let [, value] of Object.entries(data)) {
            if (value === "") {
                status = false;
            }
        }

        //Eredménynek megfelelő kimenetel
        if (status === true) {
            sendConfirmation();
        } else {
            playErrorSound();

            message("Nem töltöttél ki minden mezőt.", {
                type: 'error'
            });
        }
    }



    /**
     * sendConfirmation
     * 
     * Megerősítés
     */
    const sendConfirmation = async () => {
        const result = await confirm("Hozzáadás megerősítése", {
            cancelLabel: "Mégsem",
            okLabel: "Hozzáadás"
        })

        if (result === true) {
            await invoke('base64convert', {
                path: data.img,
                window: appWindow
            });
        }
    }


    /**
     * createLibraryEntry
     * 
     * Létrehozza az elemet a könyvtárban
     * 
     * @param data 
     * @param base64img 
     */
    const createLibraryEntry = (data: any, base64img: any) => {
        const entry = {
            name: data.name,
            path: data.exe,
            image: 'data:image/jpeg;base64,' + base64img
        }

        //Felvétel a storeba
        setAppState(actionTypes.app.ADD_LIBRARY_ITEM, entry);

        //Hang lejátszása
        playAlertSound();

        //Visszajelzés a felhasználónak
        message("Az elem hozzáadva a könyvtárhadhoz.")
            .then(() => {
                //State reset
                setData({
                    exe: '',
                    img: '',
                    name: ''
                });

                setBase64('');
            });
    }


    /**
     * setExecutable
     * 
     * Program elérési útvonalának megadása
     */
    const setExecutable = async () => {
        const result = await open({
            filters: [{
                name: "Minden fájl",
                extensions: ['exe']
            }]
        });


        //Ha van result
        if (result !== null) {
            setData((prev: any) => ({
                ...prev,
                exe: result
            }));
        }
    }


    /**
     * setCoverImage
     * 
     * Borítókép útvonalának megadása
     */
    const setCoverImage = async () => {
        const result = await open({
            filters: [{
                name: "Minden fájl",
                extensions: ['png', 'jpeg', 'jpg']
            }]
        });


        //Ha van result
        if (result !== null) {
            setData((prev: any) => ({
                ...prev,
                img: result
            }));
        }
    }


    /**
     * setApplicationName
     * 
     * Program nevének megadása
     */
    const setApplicationName = (value: any) => {
        setData((prev: any) => ({
            ...prev,
            name: value
        }));
    }


    return (
        <div className={styles.container}>
            <Template menuItems={menuItems}>
                <div className={styles.row}>
                    {settings.map((setting: any, idx: number) => {
                        return (
                            <div key={idx} className={styles.col}>
                                <div className={styles.box}>
                                    <span className={styles.title}>
                                        {setting.title}
                                    </span>

                                    {render(setting)}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Template>
        </div>
    )
}


export default Editor;
