//React
import React from "react";

//React Router
import { useNavigate } from "react-router-dom";

//Components
import Image from "../../../../../components/Image";

//Local
import { licenses } from "./const";

//Shared
import PAGES from "../../../../../shared/pages";

//Assets
import logo_react from '.././../../../../assets/images/logo/react.png';
import logo_tauri from '.././../../../../assets/images/logo/tauri.png';
import logo_typescript from '.././../../../../assets/images/logo/typescript.png';

//Styles
import styles from './Libraries.module.css';


/**
 * propertiesProps
 * 
 */
interface ILibraryProps {
    logo: any;
    name: string;
    license?: string;
}


/**
 * Libraries
 * 
 * @returns 
 */
function Libraries(): React.ReactNode {
    /**
     * Hooks
     * 
     */
    const navigate = useNavigate();


    /**
     * libraries
     * 
    */
    const libraries: ILibraryProps[] = [
        {
            name: "React",
            logo: logo_react,
            license: licenses.react
        },
        {
            name: "Tauri",
            logo: logo_tauri,
            license: licenses.tauri
        },
        {
            name: "TypeScript",
            logo: logo_typescript,
            license: licenses.typescript
        }
    ];


    /**
     * openLicense
     * 
     * @param license 
     */
    const openLicense = (name: string, license?: string): void => {
        const state = { name, license };
        navigate(PAGES.license.path, { state });
    }


    /**
     * renderLibraries
     * 
     */
    const renderLibraries = (): React.ReactNode => {
        return libraries.map((library: ILibraryProps, idx: number) => {
            return (
                <div
                    key={idx}
                    className={styles.col}
                    onClick={() => openLicense(library.name, library.license)}>
                    <div className={styles.wrapper}>
                        <div className={styles.wrapper_col}>
                            <Image
                                className={styles.logo}
                                src={library.logo} />
                        </div>
                        <div className={styles.wrapper_col}>
                            <span className={styles.name}>
                                {library.name}
                            </span>
                        </div>
                    </div>
                </div>
            )
        })
    }


    return (
        <div className={styles.container}>
            <span className={styles.title}>
                Felhasznált keretrendszerek
            </span>

            <div className={styles.row}>
                {renderLibraries()}
            </div>
        </div>
    )
}

export default Libraries;
