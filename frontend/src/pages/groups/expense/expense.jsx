
import ExpenseList from '../../../components/expense/expenseList/expenseList';
import CreateExpense from '../../../components/expense/createExpense/createExpense';
import { useState } from 'react';

const Expense = () => {
    const [groupExpenses, setGroupExpenses] = useState([]);

    return (
        <div>
            <ExpenseList groupExpenses={groupExpenses} setGroupExpenses={setGroupExpenses} />
            <CreateExpense setGroupExpenses={setGroupExpenses} />
        </div>
    );
};

export default Expense;
