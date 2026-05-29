import { useState, useEffect } from 'react';
import { EXERCISE_LABELS } from '../constants/exercises';
import { parseExerciseInput } from '../utils/inputParsing';

export default function ExerciseSettings({ exercises, onChangeExerciseValue }) {
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
    // Limit to max 1 decimal places
    if (/^\d*([.,]\d{0,1})?$/.test(rawValue) === false && rawValue !== '') {
      return;
    }

    setExerciseInputs((prev) => ({ ...prev, [key]: rawValue }));

    const parsed = parseExerciseInput(rawValue);

    if (!parsed.valid) return;

    onChangeExerciseValue({ ...exercises, [key]: parsed.value });
  }

  return (
    <section aria-labelledby='exercise-settings'>
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
              onChange={(e) => handleExerciseInputChange(key, e.target.value)}
            />
          </div>
        ))}
      </div>
      <hr />
    </section>
  );
}
