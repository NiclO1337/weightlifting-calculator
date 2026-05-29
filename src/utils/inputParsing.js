export function parseExerciseInput(rawValue) {
  // Convert comma decimals to dot decimals
  const normalized = String(rawValue).replace(',', '.');

  // Ignore temporary unfinished typing states for empty|
  if (!normalized) {
    return { valid: false, reason: 'incomplete' };
  }

  const decimalPart = normalized.split('.')[1];

  if (decimalPart && decimalPart.length > 2) {
    return { valid: false, reason: 'too_many_decimals' };
  }

  // Ignore incomplete decimal input while the user is still typing.
  if (/[.,]$/.test(rawValue)) {
    return { valid: false, reason: 'incomplete' };
  }

  const num = Number(normalized);

  if (!Number.isFinite(num)) {
    return { valid: false, reason: 'not_a_number' };
  }

  if (num < 0 || num > 250) {
    return { valid: false, reason: 'out_of_range' };
  }

  return { valid: true, value: num };
}