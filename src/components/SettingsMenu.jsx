import { useState } from 'react';
import SettingsModal from './SettingsModal';
import ExerciseSettings from './ExerciseSettings';
import WeightCalculationSettings from './WeightCalculationSettings';
import { Settings } from 'lucide-react';

export default function SettingsMenu({
  exercises,
  onChangeExerciseValue,
  rounding,
  setRounding,
  barbellWeight,
  setBarbellWeight,
  availablePlates,
  setAvailablePlates,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className='settings-menu'>
      <button
        onClick={() => setOpen(true)}
        className='btn-settings'
        aria-label='Open Settings'>
        <Settings size={40} />
      </button>
      {open && (
        <SettingsModal onClose={() => setOpen(false)}>
          <ExerciseSettings
            exercises={exercises}
            onChangeExerciseValue={onChangeExerciseValue}
          />
          <WeightCalculationSettings
            rounding={rounding}
            setRounding={setRounding}
            barbellWeight={barbellWeight}
            setBarbellWeight={setBarbellWeight}
            availablePlates={availablePlates}
            setAvailablePlates={setAvailablePlates}
          />
        </SettingsModal>
      )}
    </div>
  );
}
