import { formatDate, isBefore } from 'date-fns';
import React, { useState } from 'react';

function TripForm() {
    const today = formatDate(new Date(), "yyyy-MM-dd");

    const [tripType, setTripType] = useState("one-way");
    const [departure, setDeparture] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errs = {};
        if (!departure) {
            errs.departure = "Departure date is required.";
        } else if (isBefore(new Date(departure), new Date(today))) {
            errs.departure = "Departure date can't be in the past.";
        }

        if (tripType === "round-trip") {
            if (!returnDate) {
                errs.returnDate = "Return date is required for round trip.";
            } else if (isBefore(new Date(returnDate), new Date(departure))) {
                errs.returnDate = "Return date can't be before departure."
            }
        }

        return errs;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            setSubmitted(true);
        }
    }

    return (
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="flex flex-col text-sm font-medium text-gray-700">
          Trip Type
          <select 
            className="mt-1 p-2 border rounded-lg"
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
          >
            <option value="one-way">One Way</option>
            <option value="round-trip">Round Trip</option>
          </select>
        </label>
  
        <label className="flex flex-col text-sm font-medium text-gray-700">
          Departure Date
          <input 
            type="date" 
            className= {`mt-1 p-2 border rounded-lg ${errors.departure ? "border-red-500" : "border-gray-300"}`}
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            min={today} 
          />
            {errors.departure && <p className="text-red-500 text-sm mt-1">{errors.departure}</p>}
        </label>
  
        <label className="flex flex-col text-sm font-medium text-gray-700">
          Return Date
          <input 
            type="date" 
            className={`mt-1 p-2 border rounded-lg ${errors.returnDate ? "border-red-500" : "border-gray-300"}`}
            value={returnDate} 
            onChange={(e) => setReturnDate(e.target.value)}
            min={departure || today}
            disabled={tripType === "one-way"}
          />
          {errors.returnDate && <p className="text-red-500 text-sm mt-1">{errors.returnDate}</p>}
        </label>
  
        <button
          type="submit"
          className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700"
        >
          Book Trip
        </button>

        {submitted && (
            <div className="mt-4 bg-green-100 p-3 rounded-log text-green-700">
                <p><strong>Trip Type:</strong> {tripType}</p>
                <p><strong>Departure:</strong> {departure}</p>
               {tripType === "round-trip" && <p><strong>Return:</strong> {returnDate}</p>}
            </div>
        )}
      </form>
    );
  }

export default TripForm;