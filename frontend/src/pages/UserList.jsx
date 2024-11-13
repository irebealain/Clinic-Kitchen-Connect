import { useState, useEffect } from 'react';
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
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Clinic Staff</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                    <thead>
                        <tr className="bg-green-600 text-white">
                            <th className="py-3 px-6 text-left font-semibold">Username</th>
                            <th className="py-3 px-6 text-left font-semibold">Email</th>
                            <th className="py-3 px-6 text-left font-semibold">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                <td className="py-4 px-6 text-gray-900">{user.username}</td>
                                <td className="py-4 px-6 text-gray-900">{user.email}</td>
                                <td className="py-4 px-6 text-gray-900">{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
