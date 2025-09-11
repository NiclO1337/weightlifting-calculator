export default function BarbellSelector({ barbellWeight, onChange }) {
  return (
    <div className='barbell-selector'>
      <label htmlFor='barbell-weight'>Barbell:</label>
      <select
        name='barbell-weight'
        id='barbell-weight'
        value={barbellWeight}
        onChange={(e) => onChange(Number(e.target.value))}>
        <option value={15}>15 kg</option>
        <option value={20}>20 kg</option>
      </select>
    </div>
  );
}
