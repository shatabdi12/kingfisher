import React from 'react';

const DateInput = ({
  label,
  id,
  value,
  onChange,
  error,
  min,
  max,
  disabled,
}) => {
  return (
    <label className="flex flex-col text-sm font-medium text-gray-700">
      {label}
      <input
        id={id}
        type="date"
        className={`mt-1 p-2 border rounded-lg ${error ? 'border-red-500' : 'border-gray-300'}`}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        disabled={disabled}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </label>
  );
};

export default DateInput;
