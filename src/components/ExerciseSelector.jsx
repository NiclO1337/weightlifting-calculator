import { EXERCISE_LABELS } from '../constants/exercises';

export default function ExerciseSelector({
  exercises,
  selectedExercise,
  onChange,
}) {
  return (
    <div>
      <label htmlFor='exercise-select' className='visually-hidden'>
        Exercise
      </label>
      <select
        id='exercise-select'
        value={selectedExercise}
        onChange={(e) => onChange(e.target.value)}>
        {Object.entries(EXERCISE_LABELS).map(([key, label]) => (
          <option key={key} value={key}>
            {label} (
            {exercises && exercises[key] ? exercises[key] + ' kg' : '—'})
          </option>
        ))}
      </select>
    </div>
  );
}
