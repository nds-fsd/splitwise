import { useEffect, useState } from "react";
import Modal from "../../Modal/modal";
import Icon from "../../icon/icon"
import { createGroupExpense } from "../../../utils/expenseApi";
import { getGroupById } from "../../../utils/groupApi";
import { useParams } from "react-router-dom";
import ExpenseForm from "../expenseForm/expenseForm";
import { toast } from "react-toastify";

const CrateExpense = ({ setGroupExpenses }) => {
    const [groupInfo, setGroupInfo] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const { groupId } = useParams();

    useEffect(() => {
        getGroupInfo();
    }, []);

    const getGroupInfo = async () => {
        try {
            const data = await getGroupById(groupId);
            setGroupInfo(data);
        } catch (error) {
            console.log(error.response.data.error)
        }
    }
    const groupMembers = groupInfo?.members?.map((member) => member.user)

    const handleCreateExpense = async (data) => {
        try {
            const newExpense = await createGroupExpense(groupId, data);
            setGroupExpenses((prevExpenses) => [...prevExpenses, newExpense])
            closeModal();
            toast.success("Expense successfully created");
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }

    return (
        <div>
            <Icon className={'add'} handleClick={openModal} />
            {isModalOpen && <Modal><ExpenseForm title='Create Expense' onClose={closeModal} onSubmit={handleCreateExpense} groupMembers={groupMembers} /></Modal>}
        </div>
    )
}

export default CrateExpense;