import { PLATE_MAP, DEFAULT_PLATES } from '../constants/plates';
import './PlatePalette.css';

export default function PlatePalette({ availablePlates, onSelect }) {
  const plates = (availablePlates ?? DEFAULT_PLATES)
    .slice()
    .sort((a, b) => b - a);

  return (
    <section aria-label='Plate palette' className='plate-palette'>
      <ul>
        {plates.map((size) => (
          <li key={size}>
            <button
              type='button'
              className='plate-swatch'
              style={{ backgroundColor: PLATE_MAP[size]?.[0] }}
              aria-label={`Add ${size} kg plate`}
              onClick={() => onSelect(size)}>
              {size}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
