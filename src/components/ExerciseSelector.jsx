const LABELS = {
  snatch: 'Snatch',
  cleanAndJerk: 'Clean & Jerk',
  frontSquat: 'Frontsquat',
  backSquat: 'Backsquat',
  benchPress: 'Bench press',
  deadlift: 'Deadlift',
  other: 'Other',
};

export default function ExerciseSelector({ exercises, selectedExercise, onChange }) {
  return (
    <div className='input-group'>
      <label htmlFor='exercise-select'></label>
      <select
        id='exercise-select'
        value={selectedExercise}
        onChange={(e) => onChange(e.target.value)}>
        {Object.keys(LABELS).map((key) => (
          <option key={key} value={key}>
            {LABELS[key]} ({exercises && exercises[key] ? exercises[key] + ' kg' : '—'})
          </option>
        ))}
      </select>
    </div>
  );
}
