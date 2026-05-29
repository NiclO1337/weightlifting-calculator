import { useState } from 'react';
import { roundToIncrement } from '../utils/math';
import { getPlatesPerSide, formatPlates } from '../utils/calculatePlates';
import BarbellVisualization from './BarbellVisualization';

export default function SavedPercentages({
  oneRepMax,
  percentages,
  onRemove,
  rounding,
  barbellWeight,
  availablePlates,
}) {
  const [selected, setSelected] = useState(false);

  if (percentages.length === 0)
    return <div className='saved-percentages'>No saved percentages</div>;

  return (
    <div className='saved-percentages special-font'>
      <ul>
        {percentages.map((p) => {
          const totalWeight = roundToIncrement((oneRepMax * p) / 100, rounding);
          const platesPerSide = getPlatesPerSide(
            totalWeight,
            barbellWeight,
            availablePlates || undefined
          );

          return (
            <li key={p} onClick={() => setSelected(selected === p ? null : p)}>
              {p}% - {totalWeight} kg
              {selected === p && (
                <button
                  className='btn btn-remove'
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(p);
                    setSelected(null);
                  }}>
                  Remove
                </button>
              )}
              <span className='text-smaller'>
                <br />( {formatPlates(platesPerSide)} )
              </span>
              <div className='plate-viz'>
                <BarbellVisualization plates={platesPerSide} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
