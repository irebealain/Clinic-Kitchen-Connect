import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { TrashIcon } from "@heroicons/react/24/solid";
import CreateStudent from "../components/CreateStudent";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from '../assets/Agahozo.png';
import ProtectedRoute from "../ProtectedRoute";
const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: true },
  { name: 'Prescriptions', href: '/prescriptions', current: false },
  { name: 'Staff List', href: '/users-list', current: false },
  { name: 'Special List', href: '/special-foods', current: false },
];

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '/' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

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

  // Fetch prescriptions and dropdown data
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

  // Format date for consistent display and submission
  const formatExpiryDate = (date) => {
    const selectedDate = new Date(date);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        expiry_date: formatExpiryDate(formData.expiry_date), // Apply date formatting
      };

      await axiosInstance.post("/api/prescriptions/", formattedData);
      setShowForm(false); // Close the form popup
      fetchPrescriptions(); // Refresh the list
    } catch (error) {
      console.error("Error creating prescription:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const filteredPrescriptions = prescriptions.filter((prescription) =>
    `${prescription.first_name} ${prescription.last_name} ${prescription.special_food_name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <ProtectedRoute allowedRoles={['clinic_staff', 'kitchen_staff']}>
    <div>
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
      {/* Header */}
      <div className="flex justify-between items-center mb-4 mt-6 px-6 sm:px-16">
        <h1 className="text-xl sm:text-2xl font-bold text-green-600">Prescriptions</h1>
        <div className="flex flex-row justify-between relative">
        <CreateStudent/>
        <button
          onClick={() => setShowForm(true)}
          className="text-white px-3 py-1 h-10 self-center block sm:hidden absolute top-[-0.1rem] right-[3.5rem]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
</svg>

        </button>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 h-10 self-center hidden sm:block"
        >
          Create Prescription
        </button>
        </div>
        
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search prescriptions..."
        className="w-[15rem] sm:w-[20rem] ml-6 sm:ml-16 p-2 mb-4 border border-gray-300 rounded-[10px] mt-4 "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="overflow-x-auto pl-6 sm:pl-16">
        <table className="w-full sm:w-[90%] table-auto border-collapse border border-gray-200">
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
                <td className="p-2 border border-gray-200">{prescription.special_food_name}</td>
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
            className="bg-white p-6 rounded-md shadow-lg w-4/5 sm:w-1/3"
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
    </ProtectedRoute>
  );
};

export default Prescriptions;
