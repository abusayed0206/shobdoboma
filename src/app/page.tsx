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
      const response = await axios.get('https://shobdoboma.vercel.app/api/boma');
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
    <div className="flex flex-col min-h-screen justify-center items-center p-4 text-black bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center border border-gray-200">
        <h1 className="text-3xl font-bold mb-4 text-teal-600">শব্দবোমা</h1>
        <p className="text-lg mb-4 bg-yellow-100 p-2 rounded-lg text-yellow-800">
          {randomBoma?.boma || 'বোমা...'}
        </p>
        <p className="text-md mb-2 text-gray-700">
          {randomBoma?.nam || 'লোড...'}, {randomBoma?.poricoy || 'হচ্ছে...'}
        </p>
        
        <button
          onClick={fetchRandomBoma}
          disabled={loadingRandom}
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${loadingRandom ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loadingRandom ? 'নতুম বোমা ডেটোনেট হচ্ছে...' : 'নতুন বোমা'}
        </button>
      </div>
      
      <footer className="w-full border-t border-t-foreground/10 p-8 text-center text-xs mt-8 bg-gray-100">
        <p className="mb-6">
          Made with ❤️ by {' '}
          <a
            href="https://sayed.page"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Sayed
          </a>
          {' | '}
          <a
            href="https://github.com/abusayed0206/shobdoboma"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
