"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Boma {
  boma: string;
  nam: string;
  poricoy: string;
  id: number;
}

export default function BomaPage() {
  const [randomBoma, setRandomBoma] = useState<Boma | null>(null);
  const [loadingRandom, setLoadingRandom] = useState<boolean>(false);

  const fetchRandomBoma = async () => {
    setLoadingRandom(true);
    try {
      const response = await axios.get('https://shobdoboma.sayed.page/api/boma');
      setRandomBoma(response.data);
    } catch (error) {
      console.error('Error fetching random boma:', error);
    } finally {
      setLoadingRandom(false);
    }
  };

  useEffect(() => {
    fetchRandomBoma();
  }, []);

  return (
    <div className="flex flex-col min-h-screen justify-between bg-gradient-to-br from-purple-100 to-blue-100">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center border border-gray-200 transform transition duration-500 hover:scale-105">
          <h1 className="text-4xl font-bold mb-6 text-purple-600 animate-pulse">শব্দবোমা</h1>
          <div className="mb-6 bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-lg shadow-inner">
            <p className="text-xl font-semibold text-gray-800 animate-fade-in-down">
              {randomBoma?.boma || 'বোমা...'}
            </p>
          </div>
          <p className="text-lg mb-4 text-gray-700">
            {randomBoma?.nam || 'লোড...'}, <span className="font-italic">{randomBoma?.poricoy || 'হচ্ছে...'}</span>
          </p>
          
          <button
            onClick={fetchRandomBoma}
            disabled={loadingRandom}
            className={`bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:from-blue-600 hover:to-purple-600 transform transition duration-300 hover:scale-105 ${loadingRandom ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}`}
          >
            {loadingRandom ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                নতুম বোমা ডেটোনেট হচ্ছে...
              </span>
            ) : (
              'নতুন বোমা'
            )}
          </button>
        </div>
      </main>
      
      <footer className="w-full p-4 mt-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg p-4 text-center">
          <p className="text-white text-lg font-semibold">
            <span className="animate-pulse inline-block">❤️</span>'র সহিত তৈয়ার করিয়াছেন{' '}
            <a
              href="https://sayed.page"
              target="_blank"
              className="font-bold underline hover:text-yellow-300 transition duration-300"
              rel="noreferrer"
            >
              সাঈদ
            </a>
            {' | '}
            <a
              href="https://github.com/abusayed0206/shobdoboma"
              target="_blank"
              className="font-bold underline hover:text-yellow-300 transition duration-300"
              rel="noreferrer"
            >
              গিটহাব
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
