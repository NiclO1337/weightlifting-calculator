import { roundToIncrement } from '../utils/math.js';
import { MoveRight } from 'lucide-react';
import { PERCENTAGE_RANGE } from '../constants/percentages.js';

export default function PercentageList({
  onSelect,
  oneRepMax,
  rounding,
  selectedPercentage,
}) {
  return (
    <div className='percentages-list'>
      <ul>
        {PERCENTAGE_RANGE.map((p) => (
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
