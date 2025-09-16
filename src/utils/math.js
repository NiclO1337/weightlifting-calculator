export function roundToIncrement(value, increment = 0.5) {
  if (typeof value !== 'number' || isNaN(value)) {
    throw new Error('Value must be a valid number');
  }
  if (typeof increment !== 'number' || isNaN(increment) || increment <= 0) {
    throw new Error('Increment must be a positive number');
  }
  return Math.round(value / increment) * increment;
}