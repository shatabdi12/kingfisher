import React from 'react';

function TripForm() {
    return (
      <form className="flex flex-col space-y-4">
        <label className="flex flex-col text-sm font-medium text-gray-700">
          Trip Type
          <select className="mt-1 p-2 border rounded-lg">
            <option>One Way</option>
            <option>Two Way</option>
          </select>
        </label>
  
        <label className="flex flex-col text-sm font-medium text-gray-700">
          Departure Date
          <input type="date" className="mt-1 p-2 border rounded-lg" />
        </label>
  
        <label className="flex flex-col text-sm font-medium text-gray-700">
          Return Date
          <input type="date" className="mt-1 p-2 border rounded-lg" />
        </label>
  
        <button
          type="submit"
          className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700"
        >
          Book Trip
        </button>
      </form>
    );
  }

export default TripForm;