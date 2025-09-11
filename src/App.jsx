import { useState, useEffect } from 'react';
import './App.css';

import Header from './components/Header';
import OneRepMaxInput from './components/OneRepMaxInput';
import RoundingSelector from './components/RoundingSelector';
import BarbellSelector from './components/BarbellSelector';
import PercentageList from './components/PercentageList';
import PercentageDetail from './components/PercentageDetail';
import SavedPercentages from './components/SavedPercentages';

function App() {
  const [oneRepMax, setOneRepMax] = useState(() => {
    const stored = localStorage.getItem('oneRepMax');
    return stored ? Number(stored) : 70;
  });
  const [rounding, setRounding] = useState(() => {
    const stored = localStorage.getItem('rounding');
    return stored ? Number(stored) : 0.5;
  });
  const [barbellWeight, setBarbellWeight] = useState(() => {
    const stored = localStorage.getItem('barbellWeight');
    return stored ? Number(stored) : 15;
  });
  const [savedPercentages, setSavedPercentages] = useState(() => {
    const stored = localStorage.getItem('savedPercentages');
    return stored ? JSON.parse(stored) : [];
  });

  const [selectedPercentage, setSelectedPercentage] = useState(70);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    localStorage.setItem('oneRepMax', oneRepMax);
  }, [oneRepMax]);

  useEffect(() => {
    localStorage.setItem('rounding', rounding);
  }, [rounding]);

  useEffect(() => {
    localStorage.setItem('barbellWeight', barbellWeight);
  }, [barbellWeight]);

  useEffect(() => {
    localStorage.setItem('savedPercentages', JSON.stringify(savedPercentages));
  }, [savedPercentages]);

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
      <Header showTutorial={showTutorial} setShowTutorial={setShowTutorial} />

      <div className='input-container'>
        <OneRepMaxInput value={oneRepMax} onChange={setOneRepMax} />
        <RoundingSelector rounding={rounding} onChange={setRounding} />
        <BarbellSelector
          barbellWeight={barbellWeight}
          onChange={setBarbellWeight}
        />
      </div>

      <div className='percentage-container'>
        <PercentageList
          onSelect={setSelectedPercentage}
          oneRepMax={oneRepMax}
          rounding={rounding}
          selectedPercentage={selectedPercentage}
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
        barbellWeight={barbellWeight}
      />
    </>
  );
}

export default App;
