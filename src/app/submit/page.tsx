'use client'
import { useState, useEffect } from 'react'
import { createBrowserClient } from '@/utils/supabase' // Adjust the import path as needed

const InsertDataForm = () => {
  const supabase = createBrowserClient() // Create a Supabase client for the browser context

  const [boma, setBoma] = useState('')
  const [nam, setNam] = useState('')
  const [poricoy, setPoricoy] = useState('')
  const [submittedPassword, setSubmittedPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [dbStatus, setDbStatus] = useState('ড্যাটাবেজ সংযুগ যাচাই করা হচ্ছে...')
  const [step, setStep] = useState<'password' | 'form'>('password')

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('passwords')
          .select('password')
          .limit(1) // Limit to 1 to just check if connection is successful

        if (error) {
          setDbStatus('Failed to connect to database')
          console.error('Database connection error:', error)
        } else if (data) {
          setDbStatus('ড্যাটাবেজ সংযুক্ত হইছে।')
        }
      } catch (err) {
        setDbStatus('Failed to connect to database')
        console.error('Unexpected error:', err)
      }
    }

    checkConnection()
  }, [supabase])

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Fetch all passwords from the database
    const { data: passwordsData, error: passwordsError } = await supabase
      .from('passwords')
      .select('password')

    if (passwordsError) {
      setError('Failed to fetch passwords')
      console.error('Error fetching passwords:', passwordsError)
      return
    }

    // Check if the submitted password matches any entry
    const isPasswordValid = passwordsData?.some(
      (entry: { password: string }) => entry.password === submittedPassword,
    )

    if (!isPasswordValid) {
      setError('Invalid password')
      return
    }

    // Move to the next step (form submission)
    setStep('form')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Insert new data into 'shobdo' table
    const { error: insertError } = await supabase
      .from('shobdo')
      .insert([{ boma, nam, poricoy }]) // Column names updated to English

    if (insertError) {
      setError('শব্দবোমা সংযোজন ব্যর্থ হয়েছে')
      console.error('Error inserting data:', insertError)
      return
    }

    setSuccess('ড্যাটাবেজে সফলভাবে শব্দবোমা সংযুক্ত হয়েছে।')
    setBoma('')
    setNam('')
    setPoricoy('')
    setSubmittedPassword('')
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center rounded-lg bg-gray-50 p-6 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-indigo-700">
          নতুন শব্দবোমা পাঠান
        </h1>
        <p
          className={`mb-6 text-center text-lg font-medium ${dbStatus === 'ড্যাটাবেজ সংযুক্ত হইছে।' ? 'text-green-600' : 'text-red-600'}`}
        >
          {dbStatus}
        </p>
        {step === 'password' ? (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div className="flex flex-col">
              <label className="block text-lg font-medium text-gray-800">
                গোপন শব্দ
              </label>
              <input
                type="password"
                value={submittedPassword}
                onChange={(e) => setSubmittedPassword(e.target.value)}
                className="mt-2 rounded-lg border border-gray-300 px-4 py-3 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {error && (
              <p className="text-center text-lg text-red-600">{error}</p>
            )}
            {success && (
              <p className="text-center text-lg text-green-600">{success}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-lg font-semibold text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              প্রবেশ করুন
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col">
              <label className="block text-center text-lg font-medium text-gray-800">
                শব্দবোমা
              </label>
              <textarea
                value={boma}
                onChange={(e) => setBoma(e.target.value)}
                className="mt-2 h-40 rounded-lg border border-gray-300 px-4 py-3 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-center text-lg font-medium text-gray-800">
                নাম
              </label>
              <input
                type="text"
                value={nam}
                onChange={(e) => setNam(e.target.value)}
                className="mt-2 rounded-lg border border-gray-300 px-4 py-3 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-center text-lg font-medium text-gray-800">
                পরিচয়
              </label>
              <input
                type="text"
                value={poricoy}
                onChange={(e) => setPoricoy(e.target.value)}
                className="mt-2 rounded-lg border border-gray-300 px-4 py-3 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {error && (
              <p className="text-center text-lg text-red-600">{error}</p>
            )}
            {success && (
              <p className="text-center text-lg text-green-600">{success}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-lg font-semibold text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              বোমা পাঠান
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default InsertDataForm
