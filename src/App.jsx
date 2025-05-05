import React from 'react';
import { useLocation } from 'react-router-dom';
import TripForm from './components/TripForm';

function App() {
  useLocation(); 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Book Your QbAir Trip ✈️
        </h1>
        <TripForm />
      </div>
    </div>
  );
}

export default App;
