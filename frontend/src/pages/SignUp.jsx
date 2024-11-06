import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/Agahozo.png'
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      // Send POST request to Django backend
      const response = await axios.post('http://127.0.0.1:8000/api/auth/sign_up', {
        email,
        password,
      });

      // Handle success (e.g., show a message or redirect)
      alert('Signup successful!');
    } catch (err) {
      // Handle error
      setError(err.response ? err.response.data : 'An error occurred');
    }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src= {logo}
            className="mx-auto h-24 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Create an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" onSubmit={handleSignUp} className="space-y-6">
            {error && <p className="text-red-500">{error}</p>}
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 mr-72">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value = {email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm/6 pl-3.5"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-400 sm:text-sm/6 pl-3.5"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default SignUp