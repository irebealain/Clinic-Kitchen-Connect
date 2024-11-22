import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { TrashIcon } from "@heroicons/react/24/solid";

const SpecialFoods = () => {
  const [specialFoods, setSpecialFoods] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [showForm, setShowForm] = useState(false);

  // Fetch special foods on component mount
  useEffect(() => {
    const fetchSpecialFoods = async () => {
      try {
        const response = await axiosInstance.get("/api/special-foods/");
        setSpecialFoods(response.data);
      } catch (error) {
        console.error("Error fetching special foods:", error);
      }
    };

    fetchSpecialFoods();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission to create a new special food
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/special-foods/", formData);
      setSpecialFoods([...specialFoods, response.data]);
      setFormData({ name: "", description: "" });
      setShowForm(false); // Close the form
    } catch (error) {
      console.error("Error creating special food:", error);
    }
  };

  // Handle deleting a special food
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this special food?"
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/api/special-foods/${id}/`);
      setSpecialFoods(specialFoods.filter((food) => food.id !== id));
    } catch (error) {
      console.error("Error deleting special food:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-600">Special Foods</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition"
        >
          Create New Special Food
        </button>
      </div>

      {/* Special Foods Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left font-semibold">Food</th>
              <th className="py-3 px-6 text-left font-semibold">Description</th>
              <th className="py-3 px-6 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {specialFoods.map((food, index) => (
              <tr
                key={food.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-green-50 transition`}
              >
                <td className="py-3 px-6 text-gray-800">{food.name}</td>
                <td className="py-3 px-6 text-gray-800">{food.description}</td>
                <td className="py-3 px-6 text-center">
                    <TrashIcon size={18} 
                    onClick={() => handleDelete(food.id)}
                    className="w-5 h-5 text-red-600 hover:text-red-500 cursor-pointer inline" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Form Popup */}
      {showForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-white p-6 rounded-md shadow-lg w-1/3"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Create New Special Food</h2>
            <form onSubmit={handleFormSubmit}>
              {/* Name Input */}
              <label className="block mb-2 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Enter food name"
                required
              />

              {/* Description Input */}
              <label className="block mb-2 font-semibold">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Enter food description"
                rows="4"
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
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition"
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

export default SpecialFoods;
