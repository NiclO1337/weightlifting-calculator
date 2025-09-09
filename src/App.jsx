import { useState } from 'react';
import './App.css';

import OneRepMaxInput from './components/OneRepMaxInput';
import RoundingSelector from './components/RoundingSelector';
import PercentageList from './components/PercentageList';
import PercentageDetail from './components/PercentageDetail';
import SavedPercentages from './components/SavedPercentages';

function App() {
  const [oneRepMax, setOneRepMax] = useState(70);
  const [rounding, setRounding] = useState(0.5);
  const [selectedPercentage, setSelectedPercentage] = useState(70);
  const [savedPercentages, setSavedPercentages] = useState([]);

  const handleSavePercentage = (percent) => {
    if (!savedPercentages.includes(percent)) {
      setSavedPercentages([...savedPercentages, percent].sort((a, b) => a - b));
    }
  };

  const handleRemovePercentage = (percent) => {
    setSavedPercentages(savedPercentages.filter((p) => p !== percent));
  };

  return (
    <>
      <h1>Weight Calculator</h1>
      <div className='input-container'>
        <OneRepMaxInput value={oneRepMax} onChange={setOneRepMax} />
        <RoundingSelector rounding={rounding} onChange={setRounding} />
      </div>

      <div className='percentage-container'>
        <PercentageList
          onSelect={setSelectedPercentage}
          oneRepMax={oneRepMax}
          rounding={rounding}
        />
        <PercentageDetail
          percentage={selectedPercentage}
          oneRepMax={oneRepMax}
          rounding={rounding}
          onSave={handleSavePercentage}
        />
      </div>
      <SavedPercentages
        oneRepMax={oneRepMax}
        percentages={savedPercentages}
        onRemove={handleRemovePercentage}
        rounding={rounding}
      />
    </>
  );
}

export default App;
