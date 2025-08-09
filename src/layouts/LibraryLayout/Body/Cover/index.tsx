//Hooks
import useApp from '../../../../hooks/useApp';

//Components
import Image from '../../../../components/Image';

//Assets
import placeholderImage from '../../../../assets/images/placeholder.jpg';

//Styles
import styles from './Cover.module.css';


/**
 * Props
 * 
 */
interface Props {
    className?: any;
    compact?: boolean;
}


/**
 * Cover
 * 
 * Borítóképet megjelenítő komponens
 * 
 * @returns 
 */
function Cover({ className, compact }: Props) {
    /**
     * Context
     * 
     */
    const { appState } = useApp();


    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.col}>
                    <Image
                        className={`${styles.cover} ${className}`}
                        src={appState.library[appState.selected]?.image}
                        placeholder={placeholderImage} />
                </div>

                {!compact && (
                    <div className={styles.col}>
                        <span className={styles.title}>
                            {appState.library[appState.selected]?.name}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cover;
