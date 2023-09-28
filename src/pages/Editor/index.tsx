//React
import { useContext, useEffect, useState } from 'react';

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
import { actionTypes, LAUNCHERS } from '../../shared/const';

//Assets
import checkmark from '../../assets/images/checkmark.png';

//Styles
import styles from './Editor.module.css';


function Editor() {
    //Ctx
    const { setAppState } = useContext(AppContext);

    //State
    const [base64, setBase64] = useState<any>('');
    const [data, setData] = useState<any>({
        exe: '',
        img: '',
        name: '',
        launcher: ''
    });


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
            title: "Indítófájl",
            value: data.exe,
            type: "button",
            placeholder: "Megnyitás",
            onClick: () => setExecutable()
        },
        {
            title: "Borítókép",
            value: data.img,
            type: "button",
            placeholder: "Megnyitás",
            onClick: () => setCoverImage()
        },
        {
            title: "Program neve",
            value: data.name,
            type: "input",
            onClick: (value: any) => setApplicationName(value)
        },
        {
            title: "Indítóprogram",
            value: data.launcher,
            type: "select",
            onClick: (value: any) => setLauncherIcon(value)
        }
    ];


    //Launcher opts
    const launcherOptions = [
        LAUNCHERS.default,
        LAUNCHERS.steam,
        LAUNCHERS.ea,
        LAUNCHERS.ubisoft,
        LAUNCHERS.epic,
        LAUNCHERS.rockstar
    ]


    useEffect(() => {
        const addTauriListener = async () => {
            await appWindow.listen(
                'base64result',
                ({ event, payload }: { event: any, payload: { result: any } }) => {
                    console.log(event);
                    setBase64(payload.result);
                }
            );
        }

        addTauriListener();
    }, []);


    useEffect(() => {
        let status = true;

        for (let [, value] of Object.entries(data)) {
            if (value === "") {
                status = false;
            }
        }

        if (status === true) {
            sendConfirmation();
        }
    }, [data]);


    useEffect(() => {
        if (base64.length === 0) return;

        createLibraryEntry(data, base64);
    }, [base64, data]);


    /**
     * Input render
     * @param data 
     * @returns 
     */
    const renderInput = (data: any) => {
        switch (data.type) {
            //Button
            case "button": {
                if (data.value.length !== 0) {
                    return (<img className={styles.checkmark} src={checkmark} />)
                }
                else {
                    return (<Button
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
            //Select
            case "select": {
                return (
                    <select
                        className={styles.select}
                        value={data.value}
                        onChange={(e: any) => data.onClick(e.target.value)}>
                        {launcherOptions.map((option: any, idx: number) => {
                            return (
                                <option key={idx} value={option.id}>
                                    {option.name}
                                </option>
                            )
                        })}
                    </select>
                )
            }
        }
    }



    /**
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


    const createLibraryEntry = (data: any, base64img: any) => {
        const entry = {
            name: data.name,
            path: data.exe,
            image: 'data:image/jpeg;base64,' + base64img,
            launcher: data.launcher.length === 0 ? "-1" : data.launcher
        }

        console.log(entry);
        setAppState(actionTypes.app.ADD_LIBRARY_ITEM, entry);

        message("Az elem hozzáadva a könyvtárhadhoz.")
            .then(() => {
                setData({
                    exe: '',
                    img: '',
                    name: '',
                    launcher: ''
                });

                setBase64('');
            });
    }


    /**
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
     * Program nevének megadása
     */
    const setApplicationName = (value: any) => {
        setData((prev: any) => ({
            ...prev,
            name: value
        }));
    }


    /**
     * Launcher elérési útvonalának megadása
     */
    const setLauncherIcon = (value: any) => {
        setData((prev: any) => ({
            ...prev,
            launcher: value
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

                                    {renderInput(setting)}
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
