import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const Carts = () => {
  const [stats, setStats] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [specialFoods, setSpecialFoods] = useState([]);
  const [clinicStaff, setClinicStaff] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [prescriptionsRes, usersRes, specialFoodsRes] = await Promise.all([
          axiosInstance.get("/api/prescriptions/"),
          axiosInstance.get("/api/users/"),
          axiosInstance.get("/api/special-foods/"),
        ]);

        setPrescriptions(prescriptionsRes.data);
        setUsers(usersRes.data);
        setSpecialFoods(specialFoodsRes.data);

        // Filter clinic_staff users
        const staffUsers = usersRes.data.filter((user) => user.role === "clinic_staff");
        setClinicStaff(staffUsers);

        // Set statistics
        setStats([
          { id: 1, name: "Total Prescriptions", value: prescriptionsRes.data.length },
          { id: 2, name: "Total Users", value: usersRes.data.length },
          { id: 3, name: "Total Special Foods", value: specialFoodsRes.data.length },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-[#f7f7f7] py-12 px-6">
      <header className="-mt-8">
          <div className="ml-5 max-w-7xl px-4 py-6 sm:-px-4 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-green-600">Dashboard</h1>
          </div>
        </header>
      {/* Stats Summary */}
      <div className="mx-auto mt-8 max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center h-40 gap-2"
            >
              <dt className="text-lg font-medium text-[#eda246] self-start -mt-3">{stat.name}</dt>
              <dd className="text-5xl font-bold text-slate-700 mt-2">{stat.value}</dd>
            </div>
          ))}
        </div>
      </div>

      
      {/* Clinic Staff Summary */}
      <div className="flex ml-9 flex-row items-center gap-16 flex-wrap">
      <div className="bg-white rounded-lg shadow-md p-6 w-[36rem] sm:max-w-full">
        <h2 className="text-2xl font-bold text-[#eda246] mb-4">Clinic Staff</h2>
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

      {/* View More Prescriptions */}
      <div>
        <div className="overflow-x-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-[#eda246] mb-4">Recent Prescriptions</h2>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="py-2 px-4 text-left">Student</th>
                <th className="py-2 px-4 text-left">Issued By</th>
                <th className="py-2 px-4 text-left">Special Food</th>
                <th className="py-2 px-4 text-left">Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.slice(0, 5).map((prescription, index) => (
                <tr
                  key={prescription.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-green-100 transition`}
                >
                  <td className="py-3 px-4 text-gray-800">{prescription.first_name} {prescription.last_name}</td>
                  <td className="py-3 px-4 text-gray-800">{prescription.doctor_name}</td>
                  <td className="py-3 px-4 text-gray-800">
                    {prescription.special_food_name}
                  </td>
                  <td className="py-3 px-4 text-gray-800">
                    {prescription.expiry_date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
            onClick={() => navigate("/prescriptions")}
          >
            View More
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Carts;
