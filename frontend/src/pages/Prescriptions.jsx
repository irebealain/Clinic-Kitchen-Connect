import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { TrashIcon } from "@heroicons/react/24/solid";
import CreateStudent from "../components/CreateStudent";

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState([]);
  const [users, setUsers] = useState([]);
  const [specialFoods, setSpecialFoods] = useState([]);
  const [formData, setFormData] = useState({
    student: "",
    issued_by: "",
    special_food_id: "",
    expiry_date: "",
  });

  // Fetch prescriptions
  useEffect(() => {
    fetchPrescriptions();
    fetchDropdownData();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await axiosInstance.get("/api/prescriptions/");
      setPrescriptions(response.data);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const [studentsResponse, usersResponse, specialFoodsResponse] = await Promise.all([
        axiosInstance.get("/api/students/"),
        axiosInstance.get("/api/users/"),
        axiosInstance.get("/api/special-foods/"),
      ]);
      setStudents(studentsResponse.data);
      setUsers(usersResponse.data);
      setSpecialFoods(specialFoodsResponse.data);
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  // Delete prescription with confirmation
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this prescription?")) {
      try {
        await axiosInstance.delete(`/api/prescriptions/${id}/`);
        fetchPrescriptions();
      } catch (error) {
        console.error("Error deleting prescription:", error);
      }
    }
  };
  const formatExpiryDate = (date) => {
    const selectedDate = new Date(date);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
    const day = String(selectedDate.getDate()).padStart(2, "0"); // Add leading zero if needed
    return `${year}-${month}-${day}`;
  };
  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        expiry_date: formatExpiryDate(formData.expiry_date),
      };

      await axiosInstance.post("/api/prescriptions/", formattedData);
      setShowForm(false); // Close the form popup
      fetchPrescriptions(); // Refresh the list
    } catch (error) {
      console.error("Error creating prescription:", error);
    }
  };
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update state for form fields
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Filter prescriptions based on search
  const filteredPrescriptions = prescriptions.filter((prescription) =>
    `${prescription.first_name} ${prescription.last_name} ${prescription.special_food_id}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-green-600">Prescriptions</h1>
        <CreateStudent/>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
        >
          Create Prescription
        </button>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search prescriptions..."
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border border-gray-200">Student</th>
              <th className="p-2 border border-gray-200">Doctor</th>
              <th className="p-2 border border-gray-200">Special Food</th>
              <th className="p-2 border border-gray-200">Expiry Date</th>
              <th className="p-2 border border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrescriptions.map((prescription) => (
              <tr key={prescription.id} className="hover:bg-gray-50">
                <td className="p-2 border border-gray-200">
                  {prescription.first_name} {prescription.last_name}
                </td>
                <td className="p-2 border border-gray-200">{prescription.doctor_name}</td>
                <td className="p-2 border border-gray-200">{prescription.special_food_id}</td>
                <td className="p-2 border border-gray-200">{prescription.expiry_date}</td>
                <td className="p-2 border border-gray-200 text-center">
                  <TrashIcon
                    onClick={() => handleDelete(prescription.id)}
                    className="w-5 h-5 text-red-600 hover:text-red-500 cursor-pointer inline"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Form Popup */}
      {showForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-white p-6 rounded-md shadow-lg w-1/3"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Create Prescription</h2>
            <form onSubmit={handleFormSubmit}>
              {/* Student */}
              <label className="block mb-2">Student</label>
              <select
                name="student"
                value={formData.student}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select a student</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.first_name} {student.last_name}
                  </option>
                ))}
              </select>

              {/* Doctor */}
              <label className="block mb-2">Doctor</label>
              <select
                name="issued_by"
                value={formData.issued_by}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select a doctor</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>

              {/* Special Food */}
              <label className="block mb-2">Special Food</label>
              <select
                name="special_food_id"
                value={formData.special_food}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select a special food</option>
                {specialFoods.map((food) => (
                  <option key={food.id} value={food.id}>
                    {food.name}
                  </option>
                ))}
              </select>

              {/* Expiry Date */}
              <label className="block mb-2">Expiry Date</label>
              <input
                type="date"
                name="expiry_date"
                value={formData.expiry_date}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                required
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="mr-4 px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prescriptions;
