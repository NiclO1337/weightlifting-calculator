export function parseExerciseInput(rawValue) {
  const normalized = String(rawValue).replace(',', '.');

  // Ignore incomplete decimal input while the user is still typing.
  if (!normalized || normalized === '.' || normalized === ',') {
    return { valid: false, reason: 'incomplete' };
  }

  if (/[.,]$/.test(rawValue)) {
    return { valid: false, reason: 'incomplete' };
  }

  const num = Number(normalized);

  if (!Number.isFinite(num)) {
    return { valid: false, reason: 'not_a_number' };
  }

  if (num < 0 || num > 250) {
    return { valid: false, reason: 'out_of_range'};
  }

  return { valid: true, value: num };
}
