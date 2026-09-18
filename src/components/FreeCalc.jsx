import { useState } from 'react';
import BarbellVisualization from './BarbellVisualization';
import BarbellWeightToggle from './BarbellWeightToggle';
import PlatePalette from './PlatePalette';
import './FreeCalc.css';

export default function FreeCalc({
  barbellWeight,
  setBarbellWeight,
  availablePlates,
}) {
  const [plates, setPlates] = useState([]); // per-side, not persisted

  const totalWeight = barbellWeight + 2 * plates.reduce((sum, p) => sum + p, 0);

  const handleAdd = (size) =>
    setPlates((prev) => [...prev, size].sort((a, b) => b - a));

  const handleRemove = (index) =>
    setPlates((prev) => prev.filter((_, i) => i !== index));

  const handleClear = () => setPlates([]);

  return (
    <section aria-label='Free calc' className='free-calc'>
      <p className='free-calc-total special-font'>{totalWeight} kg</p>
      <div className='plate-viz'>
        <BarbellVisualization plates={plates} onPlateClick={handleRemove} />
      </div>
      <button
        type='button'
        className='btn btn-reset'
        disabled={plates.length === 0}
        onClick={handleClear}>
        Clear bar
      </button>
      <p className='free-calc-label'>Barbell:</p>
      <BarbellWeightToggle
        barbellWeight={barbellWeight}
        onChange={setBarbellWeight}
      />
      <p className='free-calc-label'>Weightplates:</p>
      <PlatePalette availablePlates={availablePlates} onSelect={handleAdd} />
    </section>
  );
}
