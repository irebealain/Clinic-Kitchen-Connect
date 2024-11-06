import { useState } from 'react';
import axios from 'axios';
import axiosInstance from '../services/axiosInstance';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import logo from '../assets/Agahozo.png';

// Dropdown
const people = [
  { id: 1, name: 'Clinic Staff' },
  { id: 2, name: 'Kitchen Staff' }
];

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(people[0]); // Default to first item

  // Handle form submission
  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      // Send POST request to Django backend
      const response = await axiosInstance.post('http://127.0.0.1:8000/api/auth/sign_up', {
        email,
        password,
        role: selected.name // Add role to the request
      });

      // Handle success
      alert('Signup successful!');
    } catch (err) {
      // Handle error
      setError(err.response ? err.response.data : 'Sorry! An error occured');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Your Company" src={logo} className="mx-auto h-24 w-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Create an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSignUp} className="space-y-6">
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 mr-72">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm p-2"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900 mr-80">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm p-2"
              />
            </div>
          </div>

          <Listbox value={selected} onChange={setSelected}>
            <Label className="block text-sm font-medium text-gray-900 mr-80 -mb-3">Your role</Label>
            <div className="relative">
              <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm">
                <span className="flex items-center">
                  <span className="ml-3 block truncate">{selected.name}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                </span>
              </ListboxButton>

              <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {people.map((person) => (
                  <ListboxOption
                    key={person.id}
                    value={person}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-3 pr-9 ${active ? 'bg-green-600 text-white' : 'text-gray-900'}`
                    }
                  >
                    <span className="flex items-center">
                      <span className={`ml-3 block truncate ${selected.id === person.id ? 'font-semibold' : 'font-normal'}`}>
                        {person.name}
                      </span>
                    </span>
                    {selected.id === person.id && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-green-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
