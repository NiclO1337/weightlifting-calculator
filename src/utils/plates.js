// Finds the plates needed PER SIDE for a given total weight (kg).
// Returns an array of plate sizes (kg) used on one side, sorted descending.
// If no exact combination exists, returns [].

const DEFAULT_PLATES = [20, 15, 10, 5, 2.5, 2, 1.5, 1.25, 1, 0.5];

/**
 * getPlatesPerSide(totalWeight, barbellWeight = 20, plateSizes = DEFAULT_PLATES, unit = 0.25)
 *
 * We convert everything to integer "units" where 1 unit = `unit` kg (default 0.25).
 * This avoids floating-point comparison issues.
 */
export function getPlatesPerSide(
  totalWeight,
  barbellWeight = 15,
  plateSizes = DEFAULT_PLATES,
  unit = 0.25
) {
  // basic input validation
  if (typeof totalWeight !== 'number' || typeof barbellWeight !== 'number')
    return [];
  if (totalWeight <= barbellWeight) return [];
  if (!Array.isArray(plateSizes) || plateSizes.length === 0) return [];
  if (typeof unit !== 'number' || isNaN(unit) || unit <= 0) return [];

  const perSideKg = (totalWeight - barbellWeight) / 2;
  // convert to integer units
  const targetUnits = Math.round(perSideKg / unit);

  // Prepare descending plate list and their unit sizes
  const descendingPlates = plateSizes.slice().sort((a, b) => b - a);
  const plateUnits = descendingPlates.map((p) => Math.round(p / unit));

  // recursive backtracking: try counts of the current plate from max down to 0
  function findCombination(index, remainingUnits) {
    if (remainingUnits === 0) return []; // success
    if (index >= plateUnits.length) return null; // no more plate types -> fail

    const sizeUnit = plateUnits[index];
    const maxCount = Math.floor(remainingUnits / sizeUnit);
    for (let count = maxCount; count >= 0; count--) {
      const nextRemaining = remainingUnits - count * sizeUnit;
      const sub = findCombination(index + 1, nextRemaining);
      if (sub !== null) {
        // found a solution, build array of plates for this level
        const result = [];
        for (let i = 0; i < count; i++) result.push(descendingPlates[index]);
        return result.concat(sub);
      }
    }
    return null; // no valid combination at this branch
  }

  const solution = findCombination(0, targetUnits);
  return solution || [];
}

export function platesCounts(perSidePlates = []) {
  return perSidePlates.reduce((acc, size) => {
    const key = String(size);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

export function formatPlates(perSidePlates) {
  const counts = platesCounts(perSidePlates);
  return Object.entries(counts)
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([size, qty]) => (qty > 1 ? `${size}×${qty}` : size))
    .join(', ');
}
