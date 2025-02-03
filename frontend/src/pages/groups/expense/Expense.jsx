
import ExpenseList from '../../../components/Expense/ExpenseList/ExpenseList';
import CreateExpense from '../../../components/Expense/CreateExpense/CreateExpense';
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
