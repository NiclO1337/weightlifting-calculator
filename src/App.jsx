import { useState, useEffect } from 'react';
import { CircleQuestionMark } from 'lucide-react';
import './App.css';

import OneRepMaxInput from './components/OneRepMaxInput';
import RoundingSelector from './components/RoundingSelector';
import PercentageList from './components/PercentageList';
import PercentageDetail from './components/PercentageDetail';
import SavedPercentages from './components/SavedPercentages';
import TutorialDriver from './components/TutorialDriver';

function App() {
  const [oneRepMax, setOneRepMax] = useState(() => {
    const stored = localStorage.getItem('oneRepMax');
    return stored ? Number(stored) : 70;
  });
  const [rounding, setRounding] = useState(() => {
    const stored = localStorage.getItem('rounding');
    return stored ? Number(stored) : 0.5;
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
      <h1 className="special-font">Weightlifting <br /> Calculator</h1>
      <div className='input-container'>
        <OneRepMaxInput value={oneRepMax} onChange={setOneRepMax} />
        <RoundingSelector rounding={rounding} onChange={setRounding} />
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
      />
      <button onClick={() => setShowTutorial(true)}>
        <CircleQuestionMark />
        <span className="visually-hidden">Start Tutorial</span>
        <TutorialDriver start={showTutorial} />
      </button>
    </>
  );
}

export default App;
