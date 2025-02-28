import { useEffect, useState } from 'react';
import styles from './expenseList.module.css'
import Expense from '../expense/expense';
import { getAllGroupExpensesById } from '../../../utils/expenseApi';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../context/userContextAuth';

const ExpenseList = ({ groupExpenses, setGroupExpenses }) => {
    // const navigate = useNavigate()

    useEffect(() => {
        getGroupExpenses();
    }, []);

    const { groupId } = useParams();
    const { token } = useAuth();

    const getGroupExpenses = async () => {
        try {
            const data = await getAllGroupExpensesById(groupId, token);
            setGroupExpenses(data);
        } catch (error) {
            // useNavigate('/groups')
            console.log(error.response.data.error)
        }
    };

    return (
        <section className={styles.expenses}>
            <div>
                {groupExpenses?.length === 0 ? (<p>There are no expenses in this group</p>) : (
                    <ul className={styles.list}>
                        {groupExpenses?.map((item) => (
                            <Expense key={item._id} expense={item} setGroupExpenses={setGroupExpenses} />
                        ))}
                    </ul>
                )}

            </div>
        </section>
    );
};

export default ExpenseList;