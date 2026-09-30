import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { MAX_PLATES_PER_SIDE } from '../constants/plates';
import BarbellVisualization from './BarbellVisualization';
import BarbellWeightToggle from './BarbellWeightToggle';
import PlatePalette from './PlatePalette';
import './FreeCalc.css';

export default function FreeCalc({ barbellWeight, setBarbellWeight }) {
  const [plates, setPlates] = useLocalStorage('freeCalcPlates', [20, 20]); // per-side

  const totalWeight = barbellWeight + 2 * plates.reduce((sum, p) => sum + p, 0);

  const [isFull, setIsFull] = useState(false);

  const handleAdd = (size) => {
    if (plates.length >= MAX_PLATES_PER_SIDE) {
      setIsFull(true);
      return;
    }
    setPlates((prev) => [...prev, size].sort((a, b) => b - a));
  };

  const handleRemove = (index) => {
    setPlates((prev) => prev.filter((_, i) => i !== index));
    setIsFull(false);
  };

  const handleClear = () => {
    setPlates([]);
    setIsFull(false);
  };

  return (
    <section aria-label='Free calc' className='free-calc'>
      <p className='free-calc-total special-font'>{totalWeight} kg</p>
      <div className='plate-viz'>
        <BarbellVisualization plates={plates} onPlateClick={handleRemove} />
      </div>
      {isFull && (
        <p role='alert' className='free-calc-error'>
          The bar is full. Max {MAX_PLATES_PER_SIDE} plates per side.
        </p>
      )}
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
      <PlatePalette onSelect={handleAdd} />
    </section>
  );
}
