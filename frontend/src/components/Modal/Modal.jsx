import ExpenseForm from '../ExpenseForm/ExpenseForm';
import styles from './modal.module.css';

const Modal = ({ onClose, onSubmit, title, defaultValues }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.content}>
                <h2 className={styles.title}>{title}</h2>
                {/* ExpenseForm  */}
                <Form onSubmit={onSubmit} onClose={onClose} defaultValues={defaultValues} />
            </div>
        </div>
    );
};

export default Modal;