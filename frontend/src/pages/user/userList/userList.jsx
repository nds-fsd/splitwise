import {useQuery} from "react-query";
import api from "../../../utils/axios";

const userList = () => {

    const getUsers = () => {
        return api.get('/user')
        .then(res => {
            return res.data
        })
        .catch(error => console.log(error))
    }
    const {data, isLoading} = useQuery('users', getUsers);
    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <h1>Users</h1>
            <div>
                
                {data?.length === 0 && <div>No users found</div>}
                {data?.map(user => (
                <div key={user._id}>
                    <h3>{user.name}</h3>
                    <p>Email: {user.email}</p>
                </div>
                ))}

            </div>
        </>
    );
};

export default userList;

