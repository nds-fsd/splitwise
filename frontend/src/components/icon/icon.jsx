import { MdAddCircleOutline, MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import styles from './icon.module.css'
const Icon = ({ className, handleClick, variant = 'add', id }) => {
    const iconsByVariant = {
        add: MdAddCircleOutline,
        edit: MdEdit,
        delete: FaTrashAlt,
    };
    const Icon = iconsByVariant[variant] || MdAddCircleOutline;
    return <Icon className={`${styles.icon} ${className ? styles[className] : ''}`} onClick={handleClick} data-type={variant} id={id} />;
};

export default Icon;
