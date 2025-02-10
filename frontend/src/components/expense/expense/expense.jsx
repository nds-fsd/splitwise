import { useState } from 'react';
import Icon from '../../icon/icon';
import styles from './expense.module.css'
import { deleteGroupExpense, updateGroupExpense } from '../../../utils/expenseApi';
import Modal from '../../modal/modal';
import ExpenseForm from '../expenseForm/expenseForm';
import { toast } from 'react-toastify';

const Expense = ({ expense, setGroupExpenses }) => {
    const [expandedExpenseId, setExpandedExpenseId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const groupMembers = expense.group.members.map((member) => member.user);

    const toggleParticipants = (expenseId) => {
        setExpandedExpenseId(expandedExpenseId === expenseId || isEditing ? null : expenseId);
    };

    const handleEditExpense = async (data) => {
        try {
            const response = await updateGroupExpense(expense.group._id, expense._id, data);
            setGroupExpenses((groupExpense) => groupExpense.map((e) => (e._id === expense._id ? response : e)));
            setIsEditing(false);
            toast.success('Expense succesfully edited');
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }

    const onDelete = async () => {
        const userConfirmed = window.confirm('Are you sure you want to delete this expense?');
        if (!userConfirmed) {
            return;
        }

        try {
            await deleteGroupExpense(expense.group._id, expense._id);
            setGroupExpenses((groupExpense) => groupExpense.filter((e) => e._id !== expense._id));
            toast.success('Expense succesfully deleted');
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    return (
        <div className={styles.expense}>
            <li className={styles.listItem} onClick={() => toggleParticipants(expense._id)} title='click to see the details'>
                <div className={styles.row} >
                    <div className={styles.left} >
                        <p><strong>{expense.description}</strong></p>
                        <p>Paid by <strong>{expense.paidBy.name}</strong></p>
                    </div>
                    <div className={styles.right}>
                        <p><strong>{expense.totalAmount}€</strong></p>
                        <div className={styles.buttons}>
                            <Icon variant='edit' handleClick={() => setIsEditing(true)} />
                            <Icon variant='delete' handleClick={onDelete} />
                            {isEditing && <Modal><ExpenseForm title='Edit Expense' onClose={() => setIsEditing(false)} onSubmit={handleEditExpense} groupMembers={groupMembers} defaultValues={expense} /></Modal>}
                        </div>
                    </div>
                </div>
                {expandedExpenseId === expense._id && (
                    <div className={styles.participants}>
                        <p><strong>Participants</strong></p>
                        <ul>
                            {expense.participants.map((participant, index) => (
                                <li key={index} className={styles.listItem}>
                                    {participant.user.name} {participant.amountOwed}€
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </li>
        </div>
    );
};

export default Expense;
