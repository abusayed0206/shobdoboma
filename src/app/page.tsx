'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Hind_Siliguri } from 'next/font/google'

const hindSiliguri = Hind_Siliguri({
  weight: ['400', '700'],
  subsets: ['bengali'],
})

interface Boma {
  boma: string
  nam: string
  poricoy: string
  id: number
}

export default function BomaPage() {
  const [randomBoma, setRandomBoma] = useState<Boma | null>(null)
  const [loadingRandom, setLoadingRandom] = useState<boolean>(false)

  const fetchRandomBoma = async () => {
    setLoadingRandom(true)
    try {
      const response = await axios.get('/api/boma')
      setRandomBoma(response.data)
    } catch (error) {
      console.error('Error fetching random boma:', error)
    } finally {
      setLoadingRandom(false)
    }
  }

  useEffect(() => {
    fetchRandomBoma()
  }, [])

  return (
    <div
      className={`relative flex min-h-screen w-full flex-col items-center justify-center bg-[url('/Flag_of_Bangladesh.png')] bg-cover bg-center bg-no-repeat p-4 ${hindSiliguri.className}`}
    >
      <div className="relative z-10 flex w-full max-w-md flex-col items-center justify-center">
        <main className="flex flex-grow flex-col items-center justify-center">
          <div className="mb-8 w-full transform rounded-2xl border border-gray-200 bg-white bg-opacity-90 p-8 text-center shadow-2xl transition duration-500 hover:scale-105">
            <h1 className="mb-6 text-4xl font-bold text-purple-600">
              শব্দবোমা
            </h1>
            <div className="mb-6 flex min-h-[100px] items-center justify-center rounded-lg bg-gradient-to-r from-yellow-100 to-orange-100 p-4 shadow-inner">
              <p className="rounded-lg bg-gray-800 px-2 py-1 text-xl font-semibold text-white">
                {randomBoma?.boma || 'বোমা...'}
              </p>
            </div>
            <p className="mb-4 text-lg text-gray-700">
              {randomBoma?.nam || 'লোড...'},{' '}
              <span className="font-italic">
                {randomBoma?.poricoy || 'হচ্ছে...'}
              </span>
            </p>

            <button
              onClick={fetchRandomBoma}
              disabled={loadingRandom}
              className={`transform rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-600 ${loadingRandom ? 'cursor-not-allowed opacity-50' : 'hover:shadow-xl'}`}
            >
              {loadingRandom ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  নতুম বোমা ফাটছে...
                </span>
              ) : (
                'নতুন বোমা'
              )}
            </button>
          </div>
        </main>

        <footer className="mt-8 w-full p-4">
          <div className="rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 text-center shadow-lg">
            <p className="text-lg font-semibold text-white">
              <span className="inline-block">❤️</span>র সহিত তৈয়ার করিয়াছেন{' '}
              <a
                href="https://sayed.page"
                target="_blank"
                className="font-bold underline transition duration-300 hover:text-yellow-300"
                rel="noreferrer"
              >
                সাঈদ
              </a>
              {' | '}
              <a
                href="https://github.com/abusayed0206/shobdoboma"
                target="_blank"
                className="font-bold underline transition duration-300 hover:text-yellow-300"
                rel="noreferrer"
              >
                গিটহাব
              </a>
            </p>
            <p className="text-white">
              নতুন বোমা যুক্ত কতুন{' '}
              <a
                href="/submit"
                target="_blank"
                className="font-bold underline transition duration-300 hover:text-yellow-300"
                rel="noreferrer"
              >
                এখানে
              </a>
              <p className="text-base font-semibold text-white">
                গোপন শব্দঃ murobbi_murobbi_owho_owho
              </p>
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
