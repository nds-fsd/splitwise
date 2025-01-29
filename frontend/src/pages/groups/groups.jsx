import { useState } from "react";
import GroupList from "../../components/Group/GroupList/GroupList";
import CreateGroup from "../../components/Group/CreateGroup/CreateGroup";

const Groups = () => {
    const [groups, setGroups] = useState('')

    return (
        <div>
            <GroupList groups={groups} setGroups={setGroups} />
            <CreateGroup setGroups={setGroups} />
        </div>
    )
};

export default Groups;
