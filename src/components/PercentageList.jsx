import { roundToIncrement } from '../utils/math.js';

export default function PercentageList({ onSelect, oneRepMax = 70, rounding }) {
  const percentages = [50, 60, 70, 80, 90, 100];
  return (
    <div className='percentages'>
      <ul>
        {percentages.map((p) => (
          <li key={p}>
            <button onClick={() => onSelect(p)}>
              {p}% - {roundToIncrement(oneRepMax * p / 100, rounding)} kg
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
