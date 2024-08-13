"use client";
import { useState } from 'react';
import { createBrowserClient } from '@/utils/supabase'; // Adjust the import path as needed

const InsertDataForm = () => {
  const supabase = createBrowserClient(); // Create a Supabase client for the browser context

  const [bani, setBani] = useState('');
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

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
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-md">
      <h1 className="text-xl font-semibold mb-4">Insert New Data</h1>
      <form onSubmit={handleFormSubmit} className="space-y-4">
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
