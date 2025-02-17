import { MdAddCircleOutline, MdEdit, MdOutlineDarkMode } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { CiLight } from "react-icons/ci";
import { TbDotsVertical } from "react-icons/tb";
import styles from './icon.module.css'
const Icon = ({ className, handleClick, variant = 'add', id }) => {
    const iconsByVariant = {
        add: MdAddCircleOutline,
        edit: MdEdit,
        delete: FaTrashAlt,
        light: CiLight,
        dark: MdOutlineDarkMode,
        dots: TbDotsVertical
    };
    const Icon = iconsByVariant[variant] || MdAddCircleOutline;
    return <Icon className={`${styles.icon} ${className ? styles[className] : ''}`} onClick={handleClick} data-type={variant} id={id} />;
};

export default Icon;
