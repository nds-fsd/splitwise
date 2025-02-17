
import ExpenseList from '../../../components/expense/expenseList/expenseList';
import CreateExpense from '../../../components/expense/createExpense/createExpense';
import { useState } from 'react';
import BalanceList from '../../../components/balance/balanceList/balanceList';

const Expense = () => {
    const [groupExpenses, setGroupExpenses] = useState([]);
    const [groupBalance, setGroupBalance] = useState([]);

    return (
        <div>
            <BalanceList groupBalance={groupBalance} setGroupBalance={setGroupBalance} />
            <ExpenseList groupExpenses={groupExpenses} setGroupExpenses={setGroupExpenses} />
            <CreateExpense setGroupExpenses={setGroupExpenses} />
        </div>
    );
};

export default Expense;
