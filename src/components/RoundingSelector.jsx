export default function RoundingSelector({ rounding, onChange }) {
  return (
    <div className='rounding-selector'>
      <label htmlFor='rounding'>Round to: </label>
      <select
        id='rounding'
        value={rounding}
        onChange={(e) => onChange(Number(e.target.value))}>
        <option value={0.5}>0.5 kg</option>
        <option value={1}>1 kg</option>
        <option value={2.5}>2.5 kg</option>
        <option value={5}>5 kg</option>
      </select>
    </div>
  );
}
