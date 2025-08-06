//React
import React from "react";

//Shared
import { app } from "../../../../../shared/const";

//Styles
import styles from './Properties.module.css';


/**
 * propertiesProps
 * 
 */
interface IPropertiesProps {
    name: string;
    value: any;
}


/**
 * Properties
 * 
 * @returns 
 */
function Properties(): React.ReactNode {
    /**
 * properties
 * 
 */
    const properties: IPropertiesProps[] = [
        {
            name: "Verziószám",
            value: app.version
        },
        {
            name: "Build szám",
            value: app.build
        }
    ];


    /**
     * renderProperties
     * 
     */
    const renderProperties = (): React.ReactNode => {
        return properties.map((property: IPropertiesProps, idx: number) => {
            return (
                <li key={idx}>
                    <span className={styles.propertyName}>{property.name}: </span>
                    <span className={styles.propertyValue}>{property.value}</span>
                </li>
            )
        })
    }


    return (
        <div className={styles.container}>
            <span className={styles.title}>
                Tulajdonságok
            </span>

            <ul>
                {renderProperties()}
            </ul>
        </div>
    )
}

export default Properties;
