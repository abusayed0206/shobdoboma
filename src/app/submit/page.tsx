"use client"
import { useState } from 'react';
import { createBrowserClient } from '@/utils/supabase'; // Adjust the import path as needed

const InsertDataForm = () => {
  const supabase = createBrowserClient(); // Create a Supabase client for the browser context

  const [bani, setBani] = useState('');
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [submittedPassword, setSubmittedPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Fetch all passwords from the database
    const { data: passwordsData, error: passwordsError } = await supabase
      .from('passwords')
      .select('password');

    if (passwordsError) {
      setError('Failed to fetch passwords');
      console.error('Error fetching passwords:', passwordsError);
      return;
    }

    console.log('Fetched passwords:', passwordsData);

    // Check if the submitted password matches any entry
    const isPasswordValid = passwordsData?.some(
      (entry: { password: string }) => entry.password === submittedPassword
    );

    console.log('Submitted password:', submittedPassword);
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      setError('Invalid password');
      return;
    }

    // Insert new data into 'bani' table
    const { error: insertError } = await supabase
      .from('bani')
      .insert([{ বাণী: bani, নাম: name, পদবি: designation }]);

    if (insertError) {
      setError('Failed to insert data');
      console.error('Error inserting data:', insertError);
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
