import Balance from "../balance/balance";
import styles from './balanceList.module.css';


const BalanceList = ({ groupBalance }) => {

    return (
        <div className={styles.balanceList}>
            <h2 className={styles.title}>Balance</h2>
            <div className={styles.balance}>
                {groupBalance?.map((item, index) => (
                    <Balance balance={item} key={index} />
                ))}
            </div>
        </div>
    )
}

export default BalanceList;