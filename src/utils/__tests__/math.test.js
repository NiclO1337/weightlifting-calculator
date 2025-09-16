import { describe, expect, it } from 'vitest';
import { roundToIncrement } from '../math';

describe('roundToIncrement', () => {
  it('rounds to nearest 0.5 by default', () => {
    expect(roundToIncrement(24.24)).toBe(24);
    expect(roundToIncrement(24.26)).toBe(24.5);
    expect(roundToIncrement(24.75)).toBe(25);
  });

  it('rounds to nearest specified increment: 1', () => {
    expect(roundToIncrement(24.49, 1)).toBe(24);
    expect(roundToIncrement(24.51, 1)).toBe(25);
  });

  it('rounds to nearest specified increment: 2.5', () => {
    expect(roundToIncrement(23, 2.5)).toBe(22.5);
    expect(roundToIncrement(24, 2.5)).toBe(25);
  });

  it('rounds to nearest specified increment: 5', () => {
    expect(roundToIncrement(22, 5)).toBe(20);
    expect(roundToIncrement(23, 5)).toBe(25);
  });

  it('handles negative values', () => {
    expect(roundToIncrement(-24.24)).toBe(-24);
    expect(roundToIncrement(-24.26)).toBe(-24.5);
    expect(roundToIncrement(-24.76)).toBe(-25);
  });

  it('handles zero', () => {
    expect(roundToIncrement(0)).toBe(0);
    expect(roundToIncrement(0, 2)).toBe(0);
  });

  it('handles large numbers', () => {
    expect(roundToIncrement(123456.78)).toBe(123457);
    expect(roundToIncrement(123456.25, 10)).toBe(123460);
  });

  it('handles small increments', () => {
    expect(roundToIncrement(1.234, 0.1)).toBeCloseTo(1.2, 5);
    expect(roundToIncrement(1.256, 0.1)).toBeCloseTo(1.3, 5);
  });

  it('handles non-numeric input gracefully', () => {
    expect(() => roundToIncrement(NaN)).toThrow();
    expect(() => roundToIncrement(undefined)).toThrow();
    expect(() => roundToIncrement(null)).toThrow();
  });

  it('handles non-positive increment gracefully', () => {
    expect(() => roundToIncrement(10, 0)).toThrow();
    expect(() => roundToIncrement(10, -1)).toThrow();
  });
});
