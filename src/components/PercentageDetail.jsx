import { roundToIncrement } from '../utils/math.js';
import './PercentageDetail.css'

export default function PercentageDetail({
  percentage,
  oneRepMax = 70,
  rounding,
  onSave,
}) {
  if (!percentage) return <div className='percentage-detail'>Select a %</div>;

  const range = Array.from({ length: 10 }, (_, i) => percentage + i);

  return (
    <section aria-label='Percentage detail' className='percentages-detail'>
      <ul>
        {range.map((p) => (
          <li key={p}>
            <button onClick={() => onSave(p)}>
              {p}% - {roundToIncrement((oneRepMax * p) / 100, rounding)} kg
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
