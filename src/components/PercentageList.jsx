import { roundToIncrement } from '../utils/math.js';
import { ArrowRight } from 'lucide-react';
import { PERCENTAGE_RANGE } from '../constants/percentages.js';
import './PercentageList.css'

export default function PercentageList({
  onSelect,
  oneRepMax,
  rounding,
  selectedPercentage,
}) {
  return (
    <section aria-label='Percentage list' className='percentages-list'>
      <ul>
        {PERCENTAGE_RANGE.map((p) => (
          <li
            key={p}
            className={selectedPercentage === p ? 'highlighted' : undefined}>
            <button onClick={() => onSelect(p)}>
              {p}% - {roundToIncrement((oneRepMax * p) / 100, rounding)} kg
            </button>
            <span className='arrow'>
              {selectedPercentage === p && <ArrowRight size={16} />}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
