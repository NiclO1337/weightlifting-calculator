import { useState } from 'react';
import { roundToIncrement } from '../utils/math';
import { getPlatesPerSide, formatPlates } from '../utils/plates';

export default function SavedPercentages({
  oneRepMax,
  percentages,
  onRemove,
  rounding,
  barbellWeight,
}) {
  const [selected, setSelected] = useState(false);

  if (percentages.length === 0)
    return <div className='saved-percentages'>No saved percentages</div>;

  return (
    <div className='saved-percentages special-font'>
      <ul>
        {percentages.map((p) => {
          const totalWeight = roundToIncrement((oneRepMax * p) / 100, rounding);
          const platesPerSide = getPlatesPerSide(totalWeight, barbellWeight);

          return (
            <li key={p} onClick={() => setSelected(selected === p ? null : p)}>
              {p}% - {totalWeight} kg
              <span className='text-smaller'>
                <br />( {formatPlates(platesPerSide)} )
              </span>
              {selected === p && (
                <button
                  className='btn-remove'
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(p);
                    setSelected(null);
                  }}>
                  Remove
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
