import { useEffect, useState } from "react";
import { createGroup } from "../../../utils/groupApi";
import GroupForm from "../GroupForm/GroupForm";
import Icon from "../../Icon/Icon";
import Modal from "../../Modal/Modal";
import { toast } from "react-toastify";


const CreateGroup = ({ setGroups }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // TODO User Email from JWT
    const userEmail = "csfsr@sdffs.com"

    const handleCreateGroup = async (data) => {
        try {
            const groupData = {
                ...data,
                ...data.members.push({ email: userEmail })
            }
            const newGroup = await createGroup(groupData);
            setGroups((prevGroups) => [...prevGroups, newGroup])
            closeModal();
            toast.success('Group succesfully created')
        } catch (error) {
            toast.error(error.response.data.error)
        }
    }

    return (
        <div>
            <Icon className={'add'} handleClick={openModal} id='create-group-btn' />
            {isModalOpen && <Modal><GroupForm title='Create group' onClose={closeModal} onSubmit={handleCreateGroup} createdBy={userEmail} /></Modal>}
        </div>
    )
}

export default CreateGroup;