import { roundToIncrement } from '../utils/math.js';
import { MoveRight } from 'lucide-react';

export default function PercentageList({
  onSelect,
  oneRepMax,
  rounding,
  selectedPercentage,
}) {
  const percentages = [50, 60, 70, 80, 90, 100, 110];
  return (
    <div className='percentages-list'>
      <ul>
        {percentages.map((p) => (
          <li key={p}>
            <button onClick={() => onSelect(p)}>
              {p}% - {roundToIncrement((oneRepMax * p) / 100, rounding)} kg
            </button>
            <span className='arrow'>
              {selectedPercentage === p && <MoveRight size={16}  />}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
