import { useState, useEffect } from 'react';
import RoundingSelector from './RoundingSelector';
import BarbellSelector from './BarbellSelector';
import { Settings, X } from 'lucide-react';
import { EXERCISE_LABELS } from '../constants/exercises';
import { DEFAULT_PLATES, PLATE_OPTIONS } from '../constants/plates';
import { parseExerciseInput } from '../utils/inputParsing';

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
  const effectivePlates = availablePlates ?? DEFAULT_PLATES;

  const [open, setOpen] = useState(false);

  function handlePlateToggle(plate) {
    const current = availablePlates ?? DEFAULT_PLATES;

    const updated = current.includes(plate)
      ? current.filter((p) => p !== plate)
      : [...current, plate].sort((a, b) => b - a);

    setAvailablePlates(updated);
  }

  function stringifyExerciseValues(exercises) {
    return Object.fromEntries(
      Object.entries(exercises).map(([key, value]) => [key, String(value)]),
    );
  }

  const [exerciseInputs, setExerciseInputs] = useState(() =>
    // Separate text input state from numeric exercise state so users can
    // type incomplete decimal values like "12." without breaking validation.
    stringifyExerciseValues(exercises),
  );

  useEffect(() => {
    // Keep local input strings synchronized with externally updated exercise values.
    setExerciseInputs(stringifyExerciseValues(exercises));
  }, [exercises]);

  function handleExerciseInputChange(key, rawValue) {
    setExerciseInputs((prev) => ({ ...prev, [key]: rawValue }));

    const parsed = parseExerciseInput(rawValue);

    if (!parsed.valid) return;

    onChangeExerciseValue({ ...exercises, [key]: parsed.value });
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

            <h2 id='settings-heading' className='special-font'>
              Settings
            </h2>
            <hr />
            <h3 className='special-font'>1 Rep Max values:</h3>
            <div className='settings-grid'>
              {Object.keys(exercises).map((key) => (
                <div key={key}>
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
            <h3 className='special-font'>Other settings</h3>
            <RoundingSelector rounding={rounding} onChange={setRounding} />
            <BarbellSelector
              barbellWeight={barbellWeight}
              onChange={setBarbellWeight}
            />

            <div>
              <fieldset>
                <legend>Available plates</legend>
                <div className='plates-checkboxes'>
                  {PLATE_OPTIONS.map((plate) => (
                    <label key={plate}>
                      <input
                        type='checkbox'
                        checked={effectivePlates.includes(plate)}
                        onChange={() => handlePlateToggle(plate)}
                      />
                      {plate} kg
                    </label>
                  ))}
                </div>
                <button
                  className='btn btn-reset'
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
