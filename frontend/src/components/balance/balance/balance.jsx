import { useDarkMode } from "../../../context/darkModeContext";
import styles from "./balance.module.css"

const Balance = ({ balance }) => {
    const { darkMode } = useDarkMode();
    return (
        <>
            <div className={`${styles.card} ${darkMode ? styles.cardDark : ''}`}>
                <div className={styles.name}>
                    <p>{balance?.name}</p>
                </div>
                <span className={styles.dashed}></span>
                <div className={styles.amount}>
                    {balance.amount < 0 ? <p>{balance?.amount}</p> : <p>+{balance?.amount}</p>}
                </div>
            </div>
        </>
    )
}

export default Balance;