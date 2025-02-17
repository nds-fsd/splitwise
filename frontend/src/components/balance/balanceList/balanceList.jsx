import { useEffect } from "react";
import { getGroupBalance } from "../../../utils/groupApi";
import { useParams } from "react-router-dom";
import Balance from "../balance/balance";
import styles from './balanceList.module.css';


const BalanceList = ({ groupBalance, setGroupBalance }) => {

    useEffect(() => {
        balance();
    }, []);

    const { groupId } = useParams();
    const balance = async () => {
        try {
            const data = await getGroupBalance(groupId);
            setGroupBalance(data);
        } catch (error) {
            console.log(error.response.data.error);
        }
    };
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