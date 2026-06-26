import { useState } from 'react';
import { roundToIncrement } from '../utils/math';
import { getPlatesPerSide, formatPlates } from '../utils/calculatePlates';
import BarbellVisualization from './BarbellVisualization';
import './SavedPercentages.css'

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
    <section aria-label='Saved percentages' className='saved-percentages'>
      <ul>
        {percentages.map((p) => {
          const totalWeight = roundToIncrement((oneRepMax * p) / 100, rounding);
          const platesPerSide = getPlatesPerSide(
            totalWeight,
            barbellWeight,
            availablePlates || undefined,
          );

          return (
            <li key={p}>
              <button
                className='special-font'
                onClick={() => setSelected(selected === p ? null : p)}>
                <span className={selected === p ? 'offset-text' : null}>
                  {p}% - {totalWeight} kg
                </span>
                <span className='text-smaller'>
                  <br />( {formatPlates(platesPerSide)} )
                </span>
                <div className='plate-viz'>
                  <BarbellVisualization plates={platesPerSide} />
                </div>
              </button>
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
            </li>
          );
        })}
      </ul>
    </section>
  );
}
