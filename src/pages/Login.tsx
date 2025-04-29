import React, { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import { createUser, getForm } from '../api/api';
import { User } from '../types';

const Login: React.FC = () => {
  const { setUser, setForm } = useFormContext();
  const [formData, setFormData] = useState<User>({ rollNumber: '', name: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      try {
        await createUser(formData);
      } catch {
        console.log('User already exists, fetching form...');
      }

      const formResponse = await getForm(formData.rollNumber);
      setUser(formData);
      setForm(formResponse.form);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white rounded shadow-md p-6">
        <h1 className="text-xl font-semibold text-center text-gray-800 mb-4">Student Login</h1>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-2 rounded mb-4 border border-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">
              Roll Number
            </label>
            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              required
              placeholder="e.g., 23CSE123"
              className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
