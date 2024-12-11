//Components
import Image from '../../../../components/Image';

//Assets
import placeholderImage from '../../../../assets/images/placeholder.jpg';

//Styles
import styles from './LibraryItem.module.css';


/**
 * Props
 * 
 */
interface Props {
    className?: any;
    id: number;
    name: string;
    image: string;
    location: string;
    selected: boolean;
    onClick?: (index: number) => void;
}


/**
 * LibraryItem
 * 
 * @param props 
 * @returns 
 */
function LibraryItem(props: Props) {
    /**
     * onClickHandler
     * 
     */
    const onClickHandler = () => {
        if (!props.onClick) return;

        props.onClick(props.id);
    }


    return (
        <div
            className={`${styles.container} ${props.className}`}
            data-selected={props.selected}
            onClick={onClickHandler}>
            <Image
                className={styles.cover}
                src={props.image}
                placeholder={placeholderImage} />
        </div>
    )
}

export default LibraryItem;
