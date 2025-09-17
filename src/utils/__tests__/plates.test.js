import { describe, it, expect } from 'vitest';
import { getPlatesPerSide } from '../plates';

describe('getPlatesPerSide', () => {
  it('returns correct plates for standard weights', () => {
    expect(getPlatesPerSide(34.5)).toEqual([5, 2.5, 1.25, 1]);
    expect(getPlatesPerSide(48)).toEqual([15, 1.5]);
    expect(getPlatesPerSide(100)).toEqual([20, 20, 2.5]);
  });

  it('returns empty array when totalWeight is less than or equal to barbellWeight', () => {
    expect(getPlatesPerSide(15)).toEqual([]);
    expect(getPlatesPerSide(10)).toEqual([]);
  });

  it('returns empty array when no exact combination exists', () => {
    expect(getPlatesPerSide(33, 15, [10, 5, 2.5])).toEqual([]);
  });

  it('handles custom barbell weights', () => {
    expect(getPlatesPerSide(50, 20)).toEqual([15]);
    expect(getPlatesPerSide(60, 20)).toEqual([20]);
  });

  it('handles custom plate sizes', () => {
    expect(getPlatesPerSide(50, 15, [10, 5, 2.5])).toEqual([10, 5, 2.5]);
    expect(getPlatesPerSide(55, 15, [10, 5])).toEqual([10, 10]);
  });

  it('handles very large weights', () => {
    expect(getPlatesPerSide(250)).toEqual([20, 20, 20, 20, 20, 15, 2.5]);
  });

  it('handles very small weights', () => {
    expect(getPlatesPerSide(17.5)).toEqual([1.25]);
    expect(getPlatesPerSide(16)).toEqual([0.5]);
  });

  it('handles weights that require multiple small plates', () => {
    expect(getPlatesPerSide(24.5)).toEqual([2.5, 1.25, 1]);
  });

  it('returns empty array when no plates are needed', () => {
    expect(getPlatesPerSide(15)).toEqual([]);
  });

  it('handles zero and negative weights gracefully', () => {
    expect(getPlatesPerSide(0)).toEqual([]);
    expect(getPlatesPerSide(-10)).toEqual([]);
  });

  it('handles non-array plateSizes gracefully', () => {
    expect(getPlatesPerSide(50, 15, null)).toEqual([]);
    expect(getPlatesPerSide(50, 15, 'invalid')).toEqual([]);
  });

  it('handles invalid unit values gracefully', () => {
    expect(getPlatesPerSide(50, 15, [10, 5], 0)).toEqual([]);
    expect(getPlatesPerSide(50, 15, [10, 5], -1)).toEqual([]);
    expect(getPlatesPerSide(50, 15, [10, 5], 'invalid')).toEqual([]);
  });

  it('handles non-numeric input gracefully', () => {
    expect(getPlatesPerSide('100')).toEqual([]);
    expect(getPlatesPerSide(null)).toEqual([]);
    expect(getPlatesPerSide(undefined)).toEqual([]);
    expect(getPlatesPerSide(NaN)).toEqual([]);
  });

  it('handles non number inputs for totalWeight and barbellWeight', () => {
    expect(getPlatesPerSide('100', 15)).toEqual([]);
    expect(getPlatesPerSide(100, '15')).toEqual([]);
    expect(getPlatesPerSide(null, 15)).toEqual([]);
  });
});