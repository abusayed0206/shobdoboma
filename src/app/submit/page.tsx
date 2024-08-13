"use client"
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient'; // Adjust the import path as needed

const InsertDataForm = () => {
  const [bani, setBani] = useState('');
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [password, setPassword] = useState('');
  const [submittedPassword, setSubmittedPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Fetch the password from the database
    const { data: passwordData, error: passwordError } = await supabase
      .from('bani') // Assuming you have a table 'passwords' with a single row containing the required password
      .select('password')
      .single();

    if (passwordError || !passwordData) {
      setError('Failed to fetch password');
      return;
    }

    // Verify the password
    if (submittedPassword !== passwordData.password) {
      setError('Invalid password');
      return;
    }

    // Insert new data into 'bani' table
    const { error: insertError } = await supabase
      .from('bani')
      .insert([{ বাণী: bani, নাম: name, পদবি: designation }]);

    if (insertError) {
      setError('Failed to insert data');
      return;
    }

    setSuccess('Data inserted successfully');
    setBani('');
    setName('');
    setDesignation('');
    setSubmittedPassword('');
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-md">
      <h1 className="text-xl font-semibold mb-4">Insert New Data</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">বাণী</label>
          <input
            type="text"
            value={bani}
            onChange={(e) => setBani(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">নাম</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">পদবি</label>
          <input
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={submittedPassword}
            onChange={(e) => setSubmittedPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InsertDataForm;
