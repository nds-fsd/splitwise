import { useQuery, useQueryClient } from 'react-query';
import { useAuth } from '../../../context/userContextAuth';
import { getGroupDetails } from '../../../utils/groupApi';
import { useNavigate, useParams } from 'react-router-dom';
import styles from "./groupDetails.module.css"
import ExpenseList from '../../../components/expense/expenseList/expenseList';
import CreateExpense from '../../../components/expense/createExpense/createExpense';
import BalanceList from '../../../components/balance/balanceList/balanceList';
import DebtsList from '../../../components/debts/debtsList';

const GroupDetails = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { groupId } = useParams();
    const { token } = useAuth();

    const { data, isLoading, isError, error } = useQuery(['groupDetails', groupId], () => getGroupDetails(groupId, token), {
        onError: (error) => {
            navigate('/groups')
        },
    });

    if (isLoading) {
        return <div>Loading group details...</div>;
    }

    if (isError) {
        return <div>Error loading data: {error.response?.data?.error || error}</div>;
    }

    const refreshGroupDetails = () => {
        queryClient.invalidateQueries(['groupDetails', groupId]);
    };

    return (
        <div>
            <BalanceList groupBalance={data.balance} />
            <div className={styles.grid}>
                <ExpenseList groupExpenses={data.expenses} refreshGroupDetails={refreshGroupDetails} />
                <DebtsList groupDebts={data.debts} />
            </div>
            <CreateExpense refreshGroupDetails={refreshGroupDetails} />
        </div>
    );
};

export default GroupDetails;
