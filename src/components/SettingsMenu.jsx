import { useState } from 'react';
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
  const [open, setOpen] = useState(false);

  function updateExercise(key, value) {
    const num = Number(value);
    if (isNaN(num)) return;
    onChangeExercises({ ...exercises, [key]: num });
  }

  function applyPlatesFromString(str) {
    if (!str) {
      setAvailablePlates(null);
      return;
    }
    const arr = str
      .split(',')
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n) && n > 0)
      .sort((a, b) => b - a);
    setAvailablePlates(arr.length > 0 ? arr : null);
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

            <h2 id='settings-heading' class="special-font">Settings</h2>
            <hr />
            <h3 class="special-font">1 Rep Max values:</h3>
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
                    value={exercises[key]}
                    onChange={(e) => updateExercise(key, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <hr />
            <h3 class="special-font">Other settings</h3>
            <RoundingSelector rounding={rounding} onChange={setRounding} />
            <BarbellSelector
              barbellWeight={barbellWeight}
              onChange={setBarbellWeight}
            />

            <div className='input-group'>
              <label
                htmlFor='available-plates'
                aria-label='Available plates (comma separated)'>
                Available plates (comma separated)
              </label>
              <input
                id='available-plates'
                type='text'
                placeholder='20,15,10,5,2.5'
                defaultValue={availablePlates ? availablePlates.join(',') : ''}
                onBlur={(e) => applyPlatesFromString(e.target.value)}
              />
              <small>Leave empty to use default plate set</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
