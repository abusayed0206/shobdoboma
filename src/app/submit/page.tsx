"use client";
import { useState, useEffect } from 'react';
import { createBrowserClient } from '@/utils/supabase'; // Adjust the import path as needed

const InsertDataForm = () => {
  const supabase = createBrowserClient(); // Create a Supabase client for the browser context

  const [boma, setBoma] = useState('');
  const [nam, setNam] = useState('');
  const [poricoy, setPoricoy] = useState('');
  const [submittedPassword, setSubmittedPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dbStatus, setDbStatus] = useState('Checking connection...');
  const [step, setStep] = useState<'password' | 'form'>('password');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('passwords')
          .select('password')
          .limit(1); // Limit to 1 to just check if connection is successful

        if (error) {
          setDbStatus('Failed to connect to database');
          console.error('Database connection error:', error);
        } else if (data) {
          setDbStatus('ড্যাটাবেজ সংযুক্ত হইছে।');
        }
      } catch (err) {
        setDbStatus('Failed to connect to database');
        console.error('Unexpected error:', err);
      }
    };

    checkConnection();
  }, [supabase]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
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

    // Check if the submitted password matches any entry
    const isPasswordValid = passwordsData?.some(
      (entry: { password: string }) => entry.password === submittedPassword
    );

    if (!isPasswordValid) {
      setError('Invalid password');
      return;
    }

    // Move to the next step (form submission)
    setStep('form');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Insert new data into 'shobdo' table
    const { error: insertError } = await supabase
      .from('shobdo')
      .insert([{ boma, nam, poricoy }]); // Column names updated to English

    if (insertError) {
      setError('শব্দবোমা সংযোজন ব্যর্থ হয়েছে');
      console.error('Error inserting data:', insertError);
      return;
    }

    setSuccess('ড্যাটাবেজে সফলভাবে শব্দবোমা সংযুক্ত হয়েছে।');
    setBoma('');
    setNam('');
    setPoricoy('');
    setSubmittedPassword('');
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-md">
      <h1 className="text-xl font-semibold mb-4">নতুন শব্দবোমা পাঠান</h1>
      <p className={`mb-4 ${dbStatus === 'ড্যাটাবেজ সংযুক্ত হইছে' ? 'text-green-600' : 'text-red-600'}`}>
        {dbStatus}
      </p>
      {step === 'password' ? (
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">গোপন শব্দ</label>
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
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">শব্দবোমা</label>
            <input
              type="text"
              value={boma}
              onChange={(e) => setBoma(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">নাম</label>
            <input
              type="text"
              value={nam}
              onChange={(e) => setNam(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">পরিচয়</label>
            <input
              type="text"
              value={poricoy}
              onChange={(e) => setPoricoy(e.target.value)}
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
            বোমা পাঠান
          </button>
        </form>
      )}
    </div>
  );
};

export default InsertDataForm;
