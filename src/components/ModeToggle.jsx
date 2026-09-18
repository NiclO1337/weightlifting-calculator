import './ModeToggle.css';

export default function ModeToggle({ mode, onChange }) {
  return (
    <div role='group' aria-label='Calculator mode' className='mode-toggle'>
      <button
        type='button'
        aria-pressed={mode === 'oneRM'}
        className={mode === 'oneRM' ? 'active' : undefined}
        onClick={() => onChange('oneRM')}>
        1RM Calculator
      </button>
      <button
        type='button'
        aria-pressed={mode === 'freeCalc'}
        className={mode === 'freeCalc' ? 'active' : undefined}
        onClick={() => onChange('freeCalc')}>
        Free Calc
      </button>
    </div>
  );
}
