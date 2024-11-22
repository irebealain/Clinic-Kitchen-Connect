import React, { useState } from "react";
import axiosInstance from "../axiosInstance";


const CreateStudent = () => {
  const [showForm, setShowForm] = useState(false); // Control form visibility
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
  });

  const [error, setError] = useState("");
  // const [successMessage, setSuccessMessage] = useState("");

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the backend API
      await axiosInstance.post("/api/students/", formData);
      alert("Student created successfully!");
      setShowForm(false); // Close form
      setFormData({ first_name: "", last_name: ""}); // Reset form
    } catch (error) {
      setError("Error creating student. Please check your input.");
      console.error("Error creating student:", error);
    }
  };

  return (
    <div className="p-4">
      {/* Create Student Button */}
      <button
        onClick={() => setShowForm(true)}
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
      >
        Create New Student
      </button>

      {/* Popup Form */}
      {showForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-white p-6 rounded-md shadow-lg w-1/3"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Create New Student</h2>
            <form onSubmit={handleFormSubmit}>
              {/* First Name */}
              <label className="block mb-2">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                required
              />

              {/* Last Name */}
              <label className="block mb-2">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                required
              />
              {/* Error Message */}
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {/* Buttons */}
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

export default CreateStudent;
