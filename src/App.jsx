import { useState, useEffect } from 'react';
import './App.css';

import Header from './components/Header';
import ExerciseSelector from './components/ExerciseSelector';
import SettingsMenu from './components/SettingsMenu';
import RoundingSelector from './components/RoundingSelector';
import BarbellSelector from './components/BarbellSelector';
import PercentageList from './components/PercentageList';
import PercentageDetail from './components/PercentageDetail';
import SavedPercentages from './components/SavedPercentages';

function App() {
  const sampleDefaults = {
    snatch: 50,
    cleanAndJerk: 75,
    frontSquat: 82.5,
    backSquat: 100,
    benchPress: 80,
    deadlift: 130,
    other: 69,
  };

  const [exercises, setExercises] = useState(() => {
    const legacy = localStorage.getItem('oneRepMax');
    const stored = localStorage.getItem('exercises1RM');
    if (stored) return JSON.parse(stored);
    if (legacy) {
      const val = Number(legacy) || sampleDefaults.snatch;
      return { ...sampleDefaults, snatch: val };
    }
    return sampleDefaults;
  });

  const [selectedExercise, setSelectedExercise] = useState(() => {
    const stored = localStorage.getItem('selectedExercise');
    return stored ? stored : 'snatch';
  });

  const [rounding, setRounding] = useState(() => {
    const stored = localStorage.getItem('rounding');
    return stored ? Number(stored) : 0.5;
  });

  const [barbellWeight, setBarbellWeight] = useState(() => {
    const stored = localStorage.getItem('barbellWeight');
    return stored ? Number(stored) : 15;
  });

  const [availablePlates, setAvailablePlates] = useState(() => {
    const stored = localStorage.getItem('availablePlates');
    return stored ? JSON.parse(stored) : null;
  });

  const [savedPercentages, setSavedPercentages] = useState(() => {
    const stored = localStorage.getItem('savedPercentages');
    return stored ? JSON.parse(stored) : [73, 77, 81];
  });

  const [selectedPercentage, setSelectedPercentage] = useState(70);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    localStorage.setItem('exercises1RM', JSON.stringify(exercises));
  }, [exercises]);

  useEffect(() => {
    localStorage.setItem('selectedExercise', selectedExercise);
  }, [selectedExercise]);

  useEffect(() => {
    if (availablePlates === null) {
      localStorage.removeItem('availablePlates');
    } else {
      localStorage.setItem('availablePlates', JSON.stringify(availablePlates));
    }
  }, [availablePlates]);

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

  const oneRepMax = exercises[selectedExercise];

  return (
    <>
      <Header showTutorial={showTutorial} setShowTutorial={setShowTutorial} />

      <div className='input-container'>
        <ExerciseSelector
          exercises={exercises}
          selectedExercise={selectedExercise}
          onChange={setSelectedExercise}
        />
        <SettingsMenu
          exercises={exercises}
          onChangeExercises={setExercises}
          rounding={rounding}
          setRounding={setRounding}
          barbellWeight={barbellWeight}
          setBarbellWeight={setBarbellWeight}
          availablePlates={availablePlates}
          setAvailablePlates={setAvailablePlates}
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
        availablePlates={availablePlates}
      />
    </>
  );
}

export default App;
