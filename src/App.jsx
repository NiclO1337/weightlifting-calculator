import { useState } from 'react';
import './App.css';

import Header from './components/Header';
import ExerciseSelector from './components/ExerciseSelector';
import SettingsMenu from './components/SettingsMenu';
import RoundingSelector from './components/RoundingSelector';
import BarbellSelector from './components/BarbellSelector';
import PercentageList from './components/PercentageList';
import PercentageDetail from './components/PercentageDetail';
import SavedPercentages from './components/SavedPercentages';

import { DEFAULT_EXERCISE_MAXES } from './constants/exercises';

import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [exercises, setExercises] = useLocalStorage(
    'oneRepMax',
    DEFAULT_EXERCISE_MAXES,
  );

  const [selectedExercise, setSelectedExercise] = useLocalStorage(
    'selectedExercise',
    'snatch',
  );

  const [barbellWeight, setBarbellWeight] = useLocalStorage(
    'barbellWeight',
    15,
  );

  const [availablePlates, setAvailablePlates] = useLocalStorage(
    'availablePlates',
    null,
  );

  const [savedPercentages, setSavedPercentages] = useLocalStorage(
    'savedPercentages',
    [73, 77, 81],
  );

  const [rounding, setRounding] = useLocalStorage('rounding', 0.5);

  const [selectedPercentage, setSelectedPercentage] = useState(70);
  const [showTutorial, setShowTutorial] = useState(false);

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

      <section aria-label='Settings' className='settings-container'>
        <ExerciseSelector
          exercises={exercises}
          selectedExercise={selectedExercise}
          onChange={setSelectedExercise}
        />
        <SettingsMenu
          exercises={exercises}
          onChangeExerciseValue={setExercises}
          rounding={rounding}
          setRounding={setRounding}
          barbellWeight={barbellWeight}
          setBarbellWeight={setBarbellWeight}
          availablePlates={availablePlates}
          setAvailablePlates={setAvailablePlates}
        />
      </section>

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
