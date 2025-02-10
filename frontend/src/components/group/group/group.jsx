import { useState } from 'react';
import Icon from '../../icon/icon';
import styles from './group.module.css'
import Modal from '../../Modal/modal';
import GroupForm from '../groupForm/groupForm';
import { useNavigate } from 'react-router-dom';
import { deleteGroup, updateGroup } from '../../../utils/groupApi';
import { toast } from 'react-toastify';

const Group = ({ group, setGroups }) => {
    const [expandedGroupId, setExpandedGroupId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate()

    const toggleMembers = (groupId) => {
        setExpandedGroupId(expandedGroupId === groupId ? null : groupId);
    };

    const groupMembers = group?.members?.map((p) => p.user)


    const handleEditGroup = async (data) => {
        try {
            const response = await updateGroup(group._id, data);
            setGroups((prevGroups) => prevGroups.map((g) => (g._id === group._id ? response : g)));
            setIsEditing(false);
            toast.success('Group successfully edited');
        } catch (error) {
            toast.error(error.response.data.error)
        }
    }

    const onDelete = async () => {
        const userConfirmed = window.confirm('Are you sure you want to delete this group?');
        if (!userConfirmed) {
            return;
        }

        try {
            await deleteGroup(group._id);
            setGroups((prevGroups) => prevGroups.filter((g) => g._id !== group._id));
            toast.success('Group succesfully deleted')
        } catch (error) {
            toast.error(error.response.data.error)
        }
    };

    return (
        <div className={styles.group} id={`group-card-${group._id}`}>
            <li className={styles.listItem} onMouseEnter={() => toggleMembers(group._id)}>
                <div className={styles.row} >
                    <div className={styles.left} onClick={() => navigate(`/groups/${group._id}/expenses`)} title='click to see the expenses'>
                        <p><strong>{group.name}</strong></p>
                        <p>{group.description}</p>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.buttons}>
                            <Icon variant='edit' handleClick={() => setIsEditing(true)} />
                            <Icon variant='delete' handleClick={onDelete} id="deleteGroup" />
                            {isEditing && <Modal><GroupForm title='Edit group' onClose={() => setIsEditing(false)} onSubmit={handleEditGroup} groupMembers={groupMembers} defaultValues={group} /></Modal>}
                        </div>
                    </div>
                </div>
                {expandedGroupId === group._id && (
                    <div className={styles.members}>
                        <p><strong>Members</strong></p>
                        <ul>
                            {group.members.map((member, index) => (
                                <li key={index} className={styles.listItem}>
                                    {member.user.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </li>
        </div>
    );
};

export default Group;
