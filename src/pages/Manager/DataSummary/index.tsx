//Styles
import styles from './DataSummary.module.css';

/**
 * Props
 * 
 */
interface Props {
    data: any;
    base64: string;
}


/**
 * DataSummary
 * 
 * @param props 
 * @returns 
 */
function DataSummary(props: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.row}>

                <div className={styles.col}>
                    <span className={styles.title}>
                        Indítás helye
                    </span>
                    <span className={styles.text}>
                        {props.data.exe}
                    </span>
                </div>

                <div className={styles.col}>
                    <span className={styles.title}>
                        Borítókép
                    </span>
                    <img src={`data:image/jpeg;base64,${props.base64}`} className={styles.preview} />
                </div>

                <div className={styles.col}>
                    <span className={styles.title}>
                        Megnevezés
                    </span>
                    <span className={styles.text}>
                        {props.data.name}
                    </span>
                </div>
                
            </div>
        </div>
    )
}

export default DataSummary;
