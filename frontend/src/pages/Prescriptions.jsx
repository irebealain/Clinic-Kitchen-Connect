import {useState, useEffect} from 'react'
import axiosInstance from '../axiosInstance';
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
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Prescriptions', href: '/prescriptions', current: false },
  { name: 'Staff List', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPrescription, setNewPrescription] = useState({
    first_name: '',
    last_name: '',
    doctor_name: '',
    special_food: '',
    issued_date: '',
    expiry_date: '',
  });
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axiosInstance.get('/api/prescriptions/');
        console.log(response.data);
        setPrescriptions(response.data);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };

    fetchPrescriptions();
  }, []);
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredPrescriptions(
      prescriptions.filter(
        (prescription) =>
          prescription.first_name.toLowerCase().includes(term) ||
          prescription.last_name.toLowerCase().includes(term) ||
          prescription.doctor_name.toLowerCase().includes(term)
      )
    );
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/prescriptions/${id}/`);
      setPrescriptions(prescriptions.filter((item) => item.id !== id));
      setFilteredPrescriptions(filteredPrescriptions.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting prescription:', error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/prescriptions/', newPrescription);
      setPrescriptions([...prescriptions, response.data]);
      setFilteredPrescriptions([...filteredPrescriptions, response.data]);
      setIsModalOpen(false);
      setNewPrescription({
        first_name: '',
        last_name: '',
        doctor_name: '',
        special_food: '',
        issued_date: '',
        expiry_date: '',
      });
    } catch (error) {
      console.error('Error creating prescription:', error);
    }
  };
  return (
    <div className='p-0'>
      <div className="min-h-full">
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

        <header className="bg-white">
          <div className="ml-10 max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-green-600">Prescriptions</h1>
          </div>
        </header>
        <main>
          <div className="p-0">
        <div className="min-h-full">
          <Disclosure as="nav">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center justify-between gap-80">
                  <img alt="Your Company" src={logo} className="h-12 w-12" />
                </div>
              </div>
            </div>
          </Disclosure>
          <header className="bg-white">
            <div className="ml-10 max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-green-600">Prescriptions</h1>
            </div>
          </header>

          {/* Search and Add Button */}
          <div className="flex justify-between items-center px-4 py-2">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by student or doctor name..."
              className="border rounded px-3 py-2 w-1/3"
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Add Prescription
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Student Name</th>
                  <th className="border border-gray-300 px-4 py-2">Doctor</th>
                  <th className="border border-gray-300 px-4 py-2">Special Food</th>
                  <th className="border border-gray-300 px-4 py-2">Issued Date</th>
                  <th className="border border-gray-300 px-4 py-2">Expiry Date</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrescriptions.map((prescript) => (
                  <tr key={prescript.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {prescript.first_name} {prescript.last_name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{prescript.doctor_name}</td>
                    <td className="border border-gray-300 px-4 py-2">{prescript.special_food}</td>
                    <td className="border border-gray-300 px-4 py-2">{prescript.issued_date}</td>
                    <td className="border border-gray-300 px-4 py-2">{prescript.expiry_date}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handleDelete(prescript.id)}
                        className="bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Prescription Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-1/3">
              <h2 className="text-2xl mb-4">Create Prescription</h2>
              <form onSubmit={handleCreate}>
                <input
                  type="text"
                  value={newPrescription.first_name}
                  onChange={(e) =>
                    setNewPrescription({ ...newPrescription, first_name: e.target.value })
                  }
                  placeholder="Student First Name"
                  className="block w-full border rounded px-3 py-2 mb-4"
                />
                {/* Other fields */}
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
        </main>
    </div>
    </div>

    
  )
}

export default Prescriptions
