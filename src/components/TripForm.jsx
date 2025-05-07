import { formatDate, isBefore } from 'date-fns';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import DateInput from './DateInput';

function TripForm() {
  const [searchParams] = useSearchParams();
  const [tripType, setTripType] = useState('one-way');
  const [departure, setDeparture] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const today = formatDate(new Date(), 'yyyy-MM-dd');
  const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    .toISOString()
    .split('T')[0];

  useEffect(() => {
    const paramDeparture = searchParams.get('departure');
    if (
      paramDeparture &&
      !isBefore(new Date(paramDeparture), new Date(today))
    ) {
      setDeparture(paramDeparture);
    }
  }, [searchParams, today]);

  const validate = () => {
    const errs = {};
    if (!departure) {
      errs.departure = 'Departure date is required.';
    } else if (isBefore(new Date(departure), new Date(today))) {
      errs.departure = "Departure date can't be in the past.";
    }

    if (tripType === 'round-trip') {
      if (!returnDate) {
        errs.returnDate = 'Return date is required for round trip.';
      } else if (isBefore(new Date(returnDate), new Date(departure))) {
        errs.returnDate = "Return date can't be before departure.";
      }
    }

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const handleTripTypeChange = (e) => {
    const newTripType = e.target.value;
    setTripType(e.target.value);
    setDeparture('');
    setReturnDate('');
    setSubmitted(false);
    setErrors((prevErrors) => ({
      ...prevErrors,
      departure: '',
      returnDate: newTripType === 'one-way' ? '' : prevErrors.returnDate,
    }));
  };

  const handleFieldUpdate = (field) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: '',
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <label className="flex flex-col text-sm font-medium text-gray-700">
        Trip Type
        <select
          className="mt-1 p-2 border rounded-lg"
          value={tripType}
          onChange={handleTripTypeChange}
        >
          <option value="one-way">One Way</option>
          <option value="round-trip">Round Trip</option>
        </select>
      </label>

      <DateInput
        label="Departure Date"
        id="departure"
        value={departure}
        onChange={(e) => {
          setDeparture(e.target.value);
          setSubmitted(false);
          handleFieldUpdate('departure');
        }}
        error={errors.departure}
        min={today}
        max={maxDate}
      />

      <DateInput
        label="Return Date"
        id="returnDate"
        value={returnDate}
        onChange={(e) => {
          setReturnDate(e.target.value);
          setSubmitted(false);
          handleFieldUpdate('returnDate');
        }}
        error={errors.returnDate}
        min={departure || today}
        max={maxDate}
        disabled={tripType === 'one-way'}
      />

      <button
        type="submit"
        disabled={submitted}
        className={`text-white font-semibold py-2 px-4 rounded-lg ${!submitted ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-300'}`}
      >
        Book Trip
      </button>

      {submitted && (
        <div className="mt-4 bg-green-100 p-3 rounded-log text-green-700">
          <p>
            <strong>Trip Type:</strong> {tripType}
          </p>
          <p>
            <strong>Departure:</strong> {departure}
          </p>
          {tripType === 'round-trip' && (
            <p>
              <strong>Return:</strong> {returnDate}
            </p>
          )}
        </div>
      )}
    </form>
  );
}

export default TripForm;
