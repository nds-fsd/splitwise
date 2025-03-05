import styles from './debtsList.module.css'
import Debt from "./debt/debt";

const DebtsList = ({ groupDebts }) => {
    return (
        <div className={styles.debtsList}>
            <div>
                {groupDebts?.length === 0 ? '' : (
                    <ul className={styles.list}>
                        {groupDebts?.map((debt) => (
                            <Debt key={debt._id} debt={debt} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default DebtsList;