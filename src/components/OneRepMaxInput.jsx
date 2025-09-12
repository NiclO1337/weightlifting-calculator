import { useState, useEffect } from 'react';

export default function OneRepMaxInput({ value, onChange }) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  const handleChange = (e) => {
    const raw = e.target.value.replace(',', '.');
    setInputValue(raw);
    const num = parseFloat(raw);
    if (!isNaN(num) && num >= 0 && num <= 250) {
      onChange(num);
    }
  };

  return (
    <div className='input-group'>
      <label htmlFor='weight'>1RM: </label>
      <input
        id='weight'
        type='text'
        inputMode='decimal'
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
}
