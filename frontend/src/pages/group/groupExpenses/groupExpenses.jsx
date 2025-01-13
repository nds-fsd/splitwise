import { useMutation, useQueryClient } from 'react-query';
import { getAllGroupExpensesById } from "../../../utils/expensesApi";
import { useEffect, useState } from 'react';
import ExpensesList from '../../../components/ExpensesList/ExpensesList';
import ExpensesForm from '../../../components/ExpensesForm/ExpensesForm';

const GroupExpenses = ({ groupID }) => {

    const [groupExpenses, setgroupExpenses] = useState([]);
    useEffect(() => {
        getGroupExpenses();
    }, []);


    const groupId = "507f1f77bcf86cd799439011";

    // const expense =
    // {
    //     "description": "Cena en Madrid",
    //     "totalAmount": 100,
    //     "paidBy": "507f1f77bcf86cd799439011",
    //     "participants": [
    //         { "user": "507f1f77bcf86cd799439011", "amountOwed": 25 },
    //         { "user": "507f1f77bcf86cd799439011", "amountOwed": 50 }
    //     ]
    // };

    const getGroupExpenses = async () => {
        try {
            const response = await getAllGroupExpensesById(groupId);
            setgroupExpenses(response);
        } catch (error) {
            console.log(error.response.data.error);
        }
    };
    return (

        <div>
            // Aqui debería ir ExpensesList
            {groupExpenses.length > 1 ? <p>There's no expenses in this group</p> : <ExpensesForm expense={groupExpenses} />}
        </div>
    );
};

export default GroupExpenses;
