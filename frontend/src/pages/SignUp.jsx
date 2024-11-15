import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import logo from '../assets/Agahozo.png';

const people = [
  { name: 'clinic_staff', displayName: 'Clinic Staff' },
  { name: 'kitchen_staff', displayName: 'Kitchen Staff' }
];

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(people[0]);
  const navigate = useNavigate();

  // Handle form submission
  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post('/api/auth/sign_up/', {
        username,
        email,
        password,
        role: selected.name
      });
  
      console.log("Signup successful!", response.data);
      alert('Signup successful!');
      navigate('/login');
    } catch (err) {
      const errorMessage = err.response && err.response.data 
          ? JSON.stringify(err.response.data)  // Converts object to a JSON string
          : 'An error occurred';
      setError(errorMessage);
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm p-2"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
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
            <Label className="block text-sm font-medium text-gray-900">Your role</Label>
            <div className="relative">
              <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm">
                <span className="flex items-center">
                  <span className="ml-3 block truncate">{selected.displayName}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                </span>
              </ListboxButton>

              <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {people.map((person) => (
                  <ListboxOption
                    key={person.name}
                    value={person}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-3 pr-9 ${active ? 'bg-green-600 text-white' : 'text-gray-900'}`
                    }
                  >
                    <span className="flex items-center">
                      <span className={`ml-3 block truncate ${selected.name === person.name ? 'font-semibold' : 'font-normal'}`}>
                        {person.name}
                      </span>
                    </span>
                    {selected.name === person.name && (
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
        <p className="mt-4 text-center text-sm/6 text-gray-500">
            You're a member?{' '}
            <a href="/login" className="font-semibold text-green-600 hover:text-green-500">
              Continue with login
            </a>
          </p>
      </div>
    </div>
  );
};

export default SignUp;
