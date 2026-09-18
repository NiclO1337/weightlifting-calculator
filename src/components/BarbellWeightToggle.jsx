import './BarbellWeightToggle.css';

export default function BarbellWeightToggle({ barbellWeight, onChange }) {
  return (
    <div
      role='group'
      aria-label='Barbell weight'
      className='barbell-weight-toggle'>
      <button
        type='button'
        aria-pressed={barbellWeight === 15}
        className={barbellWeight === 15 ? 'active' : undefined}
        onClick={() => onChange(15)}>
        15 kg
      </button>
      <button
        type='button'
        aria-pressed={barbellWeight === 20}
        className={barbellWeight === 20 ? 'active' : undefined}
        onClick={() => onChange(20)}>
        20 kg
      </button>
    </div>
  );
}
