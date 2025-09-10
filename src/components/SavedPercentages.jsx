import { roundToIncrement } from '../utils/math';

export default function SavedPercentages({
  oneRepMax = 70,
  percentages,
  rounding,
  onRemove,
}) {
  if (percentages.length === 0)
    return <div className='saved-percentages'>No saved percentages</div>;
  return (
    <div className='saved-percentages special-font'>
      <ul>
        {percentages.map((p) => (
          <li key={p} onClick={() => onRemove(p)}>
            {p}% - {roundToIncrement((oneRepMax * p) / 100, rounding)} kg
          </li>
        ))}
      </ul>
    </div>
  );
}
