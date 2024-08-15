import { useState, useEffect } from 'react';
import axios from 'axios';
import ThemeToggle from '@/components/ThemeToggle'; // Adjust the import path as needed

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
    <div className="flex flex-col min-h-screen justify-center items-center p-4 text-black">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">শব্দবোমা</h1>
        <p className="text-lg mb-4">{randomBoma?.boma || 'বোমা...'}</p>
        <p className="text-md mb-2">{randomBoma?.nam || 'লোড...'},{randomBoma?.poricoy || 'হচ্ছে...'}</p>
        
        <button
          onClick={fetchRandomBoma}
          disabled={loadingRandom}
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${loadingRandom ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loadingRandom ? 'নতুম বোমা ডেটোনেট হচ্ছে...' : 'নতুন বোমা'}
        </button>
      </div>
      
      <footer className="w-full justify-center border-t border-t-foreground/10 p-8 text-center text-xs mt-8">
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
        </p>
        <ThemeToggle />
      </footer>
    </div>
  );
}
