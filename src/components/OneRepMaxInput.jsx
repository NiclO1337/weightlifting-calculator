export default function OneRepMaxInput({ value = 70, onChange}) {
  return (
    <div className='input-group'>
      <label htmlFor='weight'>1RM: </label>
      <input id='weight' name='weight' value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  );
}
