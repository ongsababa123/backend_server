import React, { useState } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

export default function RandomNumberGenerator() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
  
    const handleDatesChange = ({ STDate, EDDate }) => {
      setStartDate(STDate);
      setEndDate(EDDate);
    };
  return (
    <div>
    <DateRangePicker
      startDate={startDate}
      endDate={endDate}
      onDatesChange={handleDatesChange}
      focusedInput={focusedInput}
      onFocusChange={focusedInput => setFocusedInput(focusedInput)}
      startDatePlaceholderText="Start Date"
      endDatePlaceholderText="End Date"
      showClearDates={true}
      numberOfMonths={2}
      daySize={32}
    />
    <p>START {startDate}</p>
  </div>
  );
}
