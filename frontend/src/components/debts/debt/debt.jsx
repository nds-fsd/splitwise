import { useDarkMode } from '../../../context/darkModeContext';
import styles from './debt.module.css'
const Debt = ({ debt }) => {
    const { darkMode } = useDarkMode();

    return (
        <>
            <div className={`${styles.debt} ${darkMode ? styles.debtDark : ''}`}>
                <p>{debt.from.name} owes <strong>{debt.amount}€</strong> to {debt.to.name}</p>
            </div>
        </>
    )
}

export default Debt;