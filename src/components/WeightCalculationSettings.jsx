import RoundingSelector from './RoundingSelector';
import BarbellSelector from './BarbellSelector';
import { EXERCISE_LABELS } from '../constants/exercises';
import { DEFAULT_PLATES, PLATE_OPTIONS } from '../constants/plates';

export default function WeightCalculationSettings({
  rounding,
  setRounding,
  barbellWeight,
  setBarbellWeight,
  availablePlates,
  setAvailablePlates
}) {
  const effectivePlates = availablePlates ?? DEFAULT_PLATES;

  function handlePlateToggle(plate) {
    const current = availablePlates ?? DEFAULT_PLATES;

    const updated = current.includes(plate)
      ? current.filter((p) => p !== plate)
      : [...current, plate].sort((a, b) => b - a);

    setAvailablePlates(updated);
  }
  return (
    <section aria-labelledby='weight-calculation-settings'>
      <h3 className='special-font'>Other settings</h3>
      <RoundingSelector rounding={rounding} onChange={setRounding} />
      <BarbellSelector
        barbellWeight={barbellWeight}
        onChange={setBarbellWeight}
      />

      <div>
        <fieldset>
          <legend>Available plates</legend>
          <div className='plates-checkboxes'>
            {PLATE_OPTIONS.map((plate) => (
              <label key={plate}>
                <input
                  type='checkbox'
                  checked={effectivePlates.includes(plate)}
                  onChange={() => handlePlateToggle(plate)}
                />
                {plate} kg
              </label>
            ))}
          </div>
          <button
            className='btn btn-reset'
            type='button'
            onClick={() => setAvailablePlates(null)}>
            Reset to default
          </button>
        </fieldset>
      </div>
    </section>
  );
}
