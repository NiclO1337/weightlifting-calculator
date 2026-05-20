import { useState } from 'react';
import RoundingSelector from './RoundingSelector';
import BarbellSelector from './BarbellSelector';
import { Settings, X } from 'lucide-react';

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
      <p></p>
      <button onClick={() => setOpen(!open)} className='btn-settings'>
        {open ? <X size={40} /> : <Settings size={40} />}
      </button>
      {open && (
        <div className='settings-panel'>
          <h3>1 rep max values:</h3>
          <div className='settings-grid'>
            {Object.keys(exercises).map((key) => (
              <div className='input-group' key={key}>
                <label htmlFor={`ex-${key}`}>{key}</label>
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

          <h3>Other settings</h3>
          <RoundingSelector rounding={rounding} onChange={setRounding} />
          <BarbellSelector
            barbellWeight={barbellWeight}
            onChange={setBarbellWeight}
          />

          <div className='input-group'>
            <label htmlFor='available-plates'>
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
      )}
    </div>
  );
}
