import { formatDate } from 'date-fns';
import React, { useState } from 'react';

function TripForm() {
    const today = formatDate(new Date(), "yyyy-MM-dd");
    
    const [tripType, setTripType] = useState("one-way");
    const [departure, setDeparture] = useState("");
    const [returnDate, setReturnDate] = useState("");

    return (
      <form className="flex flex-col space-y-4">
        <label className="flex flex-col text-sm font-medium text-gray-700">
          Trip Type
          <select 
            className="mt-1 p-2 border rounded-lg"
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
          >
            <option value="one-way">One Way</option>
            <option value="round-trip">Two Way</option>
          </select>
        </label>
  
        <label className="flex flex-col text-sm font-medium text-gray-700">
          Departure Date
          <input 
            type="date" 
            className="mt-1 p-2 border rounded-lg"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            min={today} />
        </label>
  
        <label className="flex flex-col text-sm font-medium text-gray-700">
          Return Date
          <input 
            type="date" 
            className="mt-1 p-2 border rounded-lg"
            value={returnDate} 
            onChange={(e) => setReturnDate(e.target.value)}
            min={departure || today}
            disabled={tripType === "one-way"}
          />
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