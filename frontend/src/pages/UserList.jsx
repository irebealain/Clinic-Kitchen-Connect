import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
// import './UserList.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [clinicStaff, setClinicStaff] = useState([]);
    useEffect(() => {
    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get("/api/users/");
            setUsers(response.data);

            const staffUsers = response.data.filter((user) => user.role === "clinic_staff");
            setClinicStaff(staffUsers);

        } catch (error) {
        console.error("Error fetching users:", error);
        }
    };

    fetchUsers();
    }, []);

    return (
            <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Clinic Staff</h2>
            <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
                <thead className="bg-green-600 text-white">
                <tr>
                    <th className="py-3 px-6 text-left font-semibold">Username</th>
                    <th className="py-3 px-6 text-left font-semibold">Email</th>
                    <th className="py-3 px-6 text-left font-semibold">Role</th>
                </tr>
                </thead>
                <tbody>
                {clinicStaff.map((user, index) => (
                    <tr
                    key={user.id}
                    className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-green-100 transition`}
                    >
                    <td className="py-3 px-6 text-gray-800">{user.username}</td>
                    <td className="py-3 px-6 text-gray-800">{user.email}</td>
                    <td className="py-3 px-6 text-gray-800">{user.role}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default UserList;
