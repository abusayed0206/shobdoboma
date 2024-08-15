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
    <div className="flex flex-col min-h-screen justify-center items-center p-4 text-black bg-gradient-to-br from-purple-100 to-blue-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border border-gray-200 transform transition duration-500 hover:scale-105">
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
      
      <footer className="w-full border-t border-t-gray-300 p-8 text-center text-sm mt-12 bg-white bg-opacity-80">
        <p className="mb-4 text-gray-600">
          Made with <span className="text-red-500 animate-pulse">❤️</span> by {' '}
          <a
            href="https://sayed.page"
            target="_blank"
            className="font-bold text-blue-600 hover:underline transition duration-300"
            rel="noreferrer"
          >
            Sayed
          </a>
          {' | '}
          <a
            href="https://github.com/abusayed0206/shobdoboma"
            target="_blank"
            className="font-bold text-blue-600 hover:underline transition duration-300"
            rel="noreferrer"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
