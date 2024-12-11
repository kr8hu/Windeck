//React
import { ReactNode } from 'react';

//Interfaces
import ILibraryItem from '../../../../../../interfaces/LibraryItem';

//Styles
import styles from './DataSummary.module.css';


/**
 * Props
 * 
 */
interface Props {
    item: ILibraryItem;
    base64: string;
}


/**
 * DataSummary
 * 
 * @param props 
 * @returns 
 */
function DataSummary({ item, base64 }: Props): ReactNode {
    return (
        <div className={styles.container}>
            <div className={styles.row}>

                <div className={styles.col}>
                    <span className={styles.title}>
                        Indítás helye
                    </span>
                    <span className={styles.text}>
                        {item.location}
                    </span>
                </div>

                <div className={styles.col}>
                    <span className={styles.title}>
                        Borítókép
                    </span>
                    <img
                        src={`data:image/jpeg;base64,${base64}`}
                        className={styles.preview}
                    />
                </div>

                <div className={styles.col}>
                    <span className={styles.title}>
                        Megnevezés
                    </span>
                    <span className={styles.text}>
                        {item.name}
                    </span>
                </div>

            </div>
        </div>
    )
}

export default DataSummary;
