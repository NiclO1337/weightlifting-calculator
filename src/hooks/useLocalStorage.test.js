import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('rounding', 0.5));

    expect(result.current[0]).toBe(0.5);
  });

  it('loads existing value from localStorage', () => {
    localStorage.setItem('rounding', JSON.stringify(2.5));

    const { result } = renderHook(() => useLocalStorage('rounding', 0.5));

    expect(result.current[0]).toBe(2.5);
  });

  it('writes new value to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('rounding', 0.5));

    act(() => {
      result.current[1](2.5);
    });

    expect(JSON.parse(localStorage.getItem('rounding'))).toBe(2.5);
  });

  it('stores arrays correctly', () => {
    const percentages = [73, 77, 81];

    localStorage.setItem('savedPercentages', JSON.stringify(percentages));

    const { result } = renderHook(() =>
      useLocalStorage('savedPercentages', []),
    );

    expect(result.current[0]).toEqual(percentages);
  });

  it('uses the initial value when stored data cannot be parsed', () => {
    localStorage.setItem('rounding', '{');

    const { result } = renderHook(() => useLocalStorage('rounding', 0.5));

    expect(result.current[0]).toBe(0.5);
  });
});
