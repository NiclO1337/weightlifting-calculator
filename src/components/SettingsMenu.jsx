import { useState, useEffect } from 'react';
import RoundingSelector from './RoundingSelector';
import BarbellSelector from './BarbellSelector';
import { Settings, X } from 'lucide-react';
import { EXERCISE_LABELS } from '../utils/exerciseLabels';

export default function SettingsMenu({
  exercises,
  onChangeExercises,
  rounding,
  setRounding,
  barbellWeight,
  setBarbellWeight,
  availablePlates,
  setAvailablePlates,
}) {
  const PLATE_OPTIONS = [25, 20, 15, 10, 5, 2.5, 2, 1.5, 1.25, 1, 0.5];

  const [open, setOpen] = useState(false);

  function handlePlateToggle(plate) {
    if (!availablePlates) {
      setAvailablePlates([plate]);
      return;
    }

    if (availablePlates.includes(plate)) {
      setAvailablePlates(availablePlates.filter((p) => p !== plate));
    } else {
      const updated = [...availablePlates, plate].sort((a, b) => b - a);
      setAvailablePlates(updated);
    }
  }

  const [exerciseInputs, setExerciseInputs] = useState(() =>
    Object.fromEntries(
      Object.entries(exercises).map(([key, value]) => [key, String(value)]),
    ),
  );

  useEffect(() => {
    setExerciseInputs(
      Object.fromEntries(
        Object.entries(exercises).map(([key, value]) => [key, String(value)]),
      ),
    );
  }, [exercises]);

  function handleExerciseInputChange(key, rawValue) {
    const normalized = String(rawValue).replace(',', '.');
    setExerciseInputs((prev) => ({ ...prev, [key]: rawValue }));

    if (!normalized || normalized === '.' || normalized === ',') return;
    if (/[.,]$/.test(rawValue)) return;

    const num = Number(normalized);
    if (!Number.isFinite(num) || num < 0 || num > 250) return;

    onChangeExercises({ ...exercises, [key]: num });
  }

  return (
    <div className='settings-menu'>
      <button
        onClick={() => setOpen(true)}
        className='btn-settings'
        aria-label='Open Settings'>
        <Settings size={40} />
      </button>

      {open && (
        <div
          className='settings-overlay'
          role='dialog'
          aria-modal='true'
          aria-labelledby='settings-heading'
          onClick={() => setOpen(false)}>
          <div className='settings-panel' onClick={(e) => e.stopPropagation()}>
            <button
              className='settings-close'
              onClick={() => setOpen(false)}
              aria-label='Close Settings'>
              <X size={30} />
            </button>

            <h2 id='settings-heading' class='special-font'>
              Settings
            </h2>
            <hr />
            <h3 class='special-font'>1 Rep Max values:</h3>
            <div className='settings-grid'>
              {Object.keys(exercises).map((key) => (
                <div className='input-group' key={key}>
                  <label
                    htmlFor={`ex-${key}`}
                    aria-label={`Set ${EXERCISE_LABELS[key] || key} 1 rep max`}>
                    {EXERCISE_LABELS[key] || key}
                  </label>
                  <input
                    id={`ex-${key}`}
                    type='text'
                    inputMode='decimal'
                    value={exerciseInputs[key] ?? ''}
                    onChange={(e) =>
                      handleExerciseInputChange(key, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
            <hr />
            <h3 class='special-font'>Other settings</h3>
            <RoundingSelector rounding={rounding} onChange={setRounding} />
            <BarbellSelector
              barbellWeight={barbellWeight}
              onChange={setBarbellWeight}
            />

            <div className='input-group'>
              <fieldset>
                <legend>Available plates</legend>
                <div className='plates-checkboxes'>
                  {PLATE_OPTIONS.map((plate) => (
                    <label key={plate}>
                      <input
                        type='checkbox'
                        checked={availablePlates?.includes(plate) || false}
                        onChange={() => handlePlateToggle(plate)}
                      />
                      {plate} kg
                    </label>
                  ))}
                </div>
                <button
                  class='btn btn-reset'
                  type='button'
                  onClick={() => setAvailablePlates(null)}>
                  Reset to default
                </button>
              </fieldset>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
