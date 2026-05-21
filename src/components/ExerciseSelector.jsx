import { EXERCISE_LABELS } from '../utils/exerciseLabels';

export default function ExerciseSelector({ exercises, selectedExercise, onChange }) {
  return (
    <div>
      <label htmlFor='exercise-select'></label>
      <select
        id='exercise-select'
        value={selectedExercise}
        onChange={(e) => onChange(e.target.value)}>
        {Object.keys(EXERCISE_LABELS).map((key) => (
          <option key={key} value={key}>
            {EXERCISE_LABELS[key]} ({exercises && exercises[key] ? exercises[key] + ' kg' : '—'})
          </option>
        ))}
      </select>
    </div>
  );
}
