"use client"
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
  const [numberOfBoma, setNumberOfBoma] = useState<number>(10);
  const [bomas, setBomas] = useState<Boma[]>([]);
  
  const fetchRandomBoma = async () => {
    try {
      const response = await axios.get('https://shobdoboma.vercel.app/api/boma');
      setRandomBoma(response.data);
    } catch (error) {
      console.error('Error fetching random boma:', error);
    }
  };

  const fetchBomas = async () => {
    try {
      const response = await axios.get(`https://shobdoboma.vercel.app/api/boma/${numberOfBoma}`);
      setBomas(response.data);
    } catch (error) {
      console.error('Error fetching bomas:', error);
    }
  };

  useEffect(() => {
    fetchRandomBoma();
    fetchBomas();
  }, [numberOfBoma]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Random Boma</h1>
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <p className="text-lg mb-4">{randomBoma?.boma || 'Loading...'}</p>
          <p className="text-md mb-2">নাম: {randomBoma?.nam || 'Loading...'}</p>
          <p className="text-md mb-2">পরিচয়: {randomBoma?.poricoy || 'Loading...'}</p>
          <button
            onClick={fetchRandomBoma}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Randomize
          </button>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Bomas</h2>
        <div className="mb-4 flex items-center">
          <input
            type="number"
            value={numberOfBoma}
            onChange={(e) => setNumberOfBoma(Number(e.target.value))}
            className="border border-gray-300 px-4 py-2 rounded mr-4 w-24"
          />
          <button
            onClick={fetchBomas}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Fetch Bomas
          </button>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          {bomas.length === 0 ? (
            <p className="text-center">Loading...</p>
          ) : (
            <ul>
              {bomas.map((boma) => (
                <li key={boma.id} className="mb-4">
                  <p className="text-lg mb-2">শব্দবোমা: {boma.boma}</p>
                  <p className="text-md mb-2">নাম: {boma.nam}</p>
                  <p className="text-md mb-2">পরিচয়: {boma.poricoy}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
    </div>
  );
}
