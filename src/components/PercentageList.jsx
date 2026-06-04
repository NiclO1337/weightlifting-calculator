import { roundToIncrement } from '../utils/math.js';
import { ArrowRight } from 'lucide-react';
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
          <li key={p} className={selectedPercentage === p && 'highlighted'}>
            <button

              onClick={() => onSelect(p)}>
              {p}% - {roundToIncrement((oneRepMax * p) / 100, rounding)} kg
            </button>
            <span className='arrow'>
              {selectedPercentage === p && <ArrowRight size={16} />}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
