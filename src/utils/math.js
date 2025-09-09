export function roundToIncrement(value, increment = 0.5) {
  return Math.round(value / increment) * increment;
}