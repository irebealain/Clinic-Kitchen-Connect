import {useState, useEffect} from 'react'
import axiosInstance from '../axiosInstance';
const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('/api/users/');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);
    return (
    <div>
        <div className="user-list">
            <h1 className="text-2xl font-bold">Users</h1>
            <ul className="mt-4">
                {users.map((user) => (
                    <li key={user.id} className="py-2 border-b">
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                    </li>
                ))}
            </ul>
        </div>
    </div>
    )
}

export default UserList
