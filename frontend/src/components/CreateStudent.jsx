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
        className="text-white px-4 py-2 block sm:hidden absolute top-[-0.5rem] right-[-1.5rem]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="size-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
</svg>

      </button>
      <button
        onClick={() => setShowForm(true)}
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 hidden sm:block"
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
            className="bg-white p-6 rounded-md shadow-lg w-4/5 sm:w-1/3"
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
