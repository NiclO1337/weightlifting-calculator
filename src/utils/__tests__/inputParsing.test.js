import { describe, it, expect } from 'vitest';
import { parseExerciseInput } from '../inputParsing';

describe('parseExerciseInput', () => {
  it('returns interger for valid input', () => {
    expect(parseExerciseInput('100')).toEqual({ valid: true, value: 100 });
  });

  it('returns float for valid input with dot decimals', () => {
    expect(parseExerciseInput('100.5')).toEqual({ valid: true, value: 100.5 });
  });

  it('returns float for valid input with comma decimals', () => {
    expect(parseExerciseInput('150,25')).toEqual({
      valid: true,
      value: 150.25,
    });
  });

  it('returns null for empty input or just a dot or comma', () => {
    expect(parseExerciseInput('')).toEqual({
      valid: false,
      reason: 'incomplete',
    });
    expect(parseExerciseInput('.')).toEqual({
      valid: false,
      reason: 'incomplete',
    });
    expect(parseExerciseInput(',')).toEqual({
      valid: false,
      reason: 'incomplete',
    });
  });

  it('returns null for incomplete (dot and comma) decimal input', () => {
    expect(parseExerciseInput('100.')).toEqual({
      valid: false,
      reason: 'incomplete',
    });
    expect(parseExerciseInput('150,')).toEqual({
      valid: false,
      reason: 'incomplete',
    });
  });

  it('returns null for non-numeric input', () => {
    expect(parseExerciseInput('abc')).toEqual({
      valid: false,
      reason: 'not_a_number',
    });
    expect(parseExerciseInput('100kg')).toEqual({
      valid: false,
      reason: 'not_a_number',
    });
  });

  it('returns null for out of range input', () => {
    expect(parseExerciseInput(-10)).toEqual({
      valid: false,
      reason: 'out_of_range',
    });
    expect(parseExerciseInput(300)).toEqual({
      valid: false,
      reason: 'out_of_range',
    });
  });

  it('returns null for input with too many decimal places', () => {
    expect(parseExerciseInput('100.123')).toEqual({
      valid: false,
      reason: 'too_many_decimals',
    });
    expect(parseExerciseInput('150,456')).toEqual({
      valid: false,
      reason: 'too_many_decimals',
    });
  });
});
