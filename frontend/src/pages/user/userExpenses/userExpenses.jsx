import { useMutation, useQueryClient } from 'react-query';
import { getAllUserExpensesById, createGroupExpense } from "../../../utils/expenseApi";
import { useEffect, useState } from 'react';

const UserExpenses = ({ user }) => {
    // const queryClient = useQueryClient();
    const [userExpenses, setUserExpenses] = useState([]);
    useEffect(() => {
        getUserExpenses();
        // createExpense();
    }, []);

    const userId = "507f1f77bcf86cd799439011";

    const getUserExpenses = async () => {
        try {
            const response = await getAllUserExpensesById(userId);
            setUserExpenses(response);
        } catch (error) {
            console.log(error.response.data.error);
            // alert(error)
        }
    };

    console.log(userExpenses)


    // const groupId = "507f1f77bcf86cd799439011";

    // const data =
    // {
    //     "description": "Cena en Madrid",
    //     "totalAmount": 100,
    //     "paidBy": "507f1f77bcf86cd799439011",
    //     "participants": [
    //         { "user": "507f1f77bcf86cd799439011", "amountOwed": 25 },
    //         { "user": "507f1f77bcf86cd799439011", "amountOwed": 50 }
    //     ]
    // };



    // const createExpense = async () => {
    //     try {
    //         const response = await createGroupExpense(groupId, data);
    //         console.log(response);
    //     } catch (error) {
    //         console.log(error.response.data.error);
    //     }
    // };

    return (

        <div>
            {userExpenses.length < 1 ? <p>There's no expenses</p> : <p>There are expenses</p>}
        </div>
    );
};

export default UserExpenses;
