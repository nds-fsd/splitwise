import { useEffect } from 'react';
import styles from './grouplist.module.css';
import { getGroupByUserId } from '../../../utils/groupApi';
import Group from '../group/group';

const GroupList = ({ groups, setGroups }) => {
    useEffect(() => {
        getGroups();
    }, []);

    // TODO User Id from JWT
    const userId = "678533a75e808b89549e316a"

    const getGroups = async () => {
        try {
            const data = await getGroupByUserId(userId);
            setGroups(data);
        } catch (error) {
            console.log(error.response.data.error)
        }
    };

    return (
        <section className={styles.groups}>
            {groups.length === 0 ? (<p className={styles.text}>There are no groups</p>) : (
                <ul className={styles.list}>
                    {groups.map((group) => (
                        <Group key={group._id} group={group} setGroups={setGroups} />
                    ))}
                </ul>
            )}
        </section>
    );
};

export default GroupList;