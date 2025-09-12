import { roundToIncrement } from '../utils/math';
import { getPlatesPerSide, formatPlates } from '../utils/plates';

export default function SavedPercentages({
  oneRepMax = 70,
  percentages,
  onRemove,
  rounding,
  barbellWeight,
}) {
  if (percentages.length === 0)
    return <div className='saved-percentages'>No saved percentages</div>;

  return (
    <div className='saved-percentages special-font'>
      <ul>
        {percentages.map((p) => {
          const totalWeight = roundToIncrement((oneRepMax * p) / 100, rounding);
          const platesPerSide = getPlatesPerSide(totalWeight, barbellWeight);

          return (
            <li key={p} onClick={() => onRemove(p)}>
              {p}% - {totalWeight} kg
              <span className='text-smaller'><br/>( {formatPlates(platesPerSide)} )</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
