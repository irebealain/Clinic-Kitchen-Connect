import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from '../assets/Agahozo.png';
const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: true },
  { name: 'Prescriptions', href: '/prescriptions', current: false },
  { name: 'Staff List', href: '/users-list', current: false },
  { name: 'Special List', href: '/special-foods', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '/' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

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
    <div className="bg-white min-h-screen">
      <Disclosure as="nav" className="">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center justify-between gap-80">
                <div className="shrink-0">
                  <img
                    alt="Your Company"
                    src= {logo}
                    className="h-12 w-12"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current ? ' text-gray-600' : 'hover:text-gray-500',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img alt="" src={user.imageUrl} className="h-8 w-8 rounded-full" />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          <a
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                          >
                            {item.name}
                          </a>
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-green-800 p-2 text-slate-100 hover:bg-green-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-800">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current ? 'text-gray-900': 'text-gray-300 hover:text-green-400',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="shrink-0">
                  <img alt="" src={user.imageUrl} className="h-10 w-10 rounded-full" />
                </div>
                <div className="ml-3">
                  <div className="text-base/5 font-medium text-white">{user.name}</div>
                  <div className="text-sm font-medium text-gray-400">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:text-green-400"
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>
        <hr className='border-[#d1d1d1]'/>
      <div className="mb-6 mt-8 px-6 sm:px-16 flex justify-between items-center">
        <h1 className="text-xl sm:text-3xl font-bold text-green-600">Special Foods</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition hidden sm:block"
        >
          Create Special Food
        </button>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-500 transition absolute block sm:hidden right-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

        </button>
      </div>

      {/* Special Foods Table */}
      <div className="overflow-x-auto bg-white">
        <table className="w-full sm:w-[90%] ml-8 sm:ml-16 border border-gray-200">
          <thead className="bg-green-600 text-[#0000009e]">
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
                  index % 2 != 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-green-50 transition`}
              >
                <td className="py-3 px-6 text-gray-800">{food.name}</td>
                <td className="py-3 px-6 text-gray-800">{food.description}</td>
                <td className="py-3 px-6 text-center">
                    <TrashIcon size={18} 
                    onClick={() => handleDelete(food.id)}
                    className="w-5 h-5 text-gray-600 hover:text-gray-500 cursor-pointer inline" />
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
            className="bg-white p-6 rounded-md shadow-lg w-4/5 sm:w-1/3"
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
