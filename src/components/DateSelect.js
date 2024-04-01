import React, { useState, useEffect } from "react";

const DateSelect = ({ onSelect }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const generateNext7Days = () => {
      const options = [];
      const today = new Date();
      const formatter = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      for (let i = 1; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const formattedDate = formatter.format(date);
        const [month, day, year] = formattedDate.split("/");
        const newFormattedDate = `${day}.${month}.${year}`;
        options.push({
          value: newFormattedDate,
          label: newFormattedDate,
        });
      }
      return options;
    };

    const options = generateNext7Days();
    setOptions(options);
  }, []);

  const handleSelectChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
    onSelect(selectedDate);
  };

  return (
    <div>
      <select value={selectedDate} onChange={handleSelectChange}>
        <option value="">Tänään</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateSelect;
