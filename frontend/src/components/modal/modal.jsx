import { useDarkMode } from '../../context/darkModeContext';
import styles from './modal.module.css';

const Modal = ({ children }) => {
    const { darkMode } = useDarkMode();

    return (
        <div className={styles.modal}>
            <div className={`${styles.content} ${darkMode ? styles.contentDark : ''}`}>
                {children}
            </div>
        </div>
    );
};

export default Modal;