import { roundToIncrement } from '../utils/math.js';

export default function PercentageDetail({
  percentage,
  oneRepMax = 70,
  rounding,
  onSave,
}) {
  if (!percentage) return <div className='percentage-detail'>Select a %</div>;

  const range = Array.from({ length: 10 }, (_, i) => percentage + i);

  return (
    <div className='percentages-detail'>
      <ul>
        {range.map((p) => (
          <li key={p} onClick={() => onSave(p)}>
            {p}% - {roundToIncrement(oneRepMax * p / 100, rounding)} kg
          </li>
        ))}
      </ul>
    </div>
  );
}
