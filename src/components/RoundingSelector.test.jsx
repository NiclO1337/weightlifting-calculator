import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import RoundingSelector from './RoundingSelector';

describe('RoundingSelector', () => {
  it('renders label and all options', () => {
    render(<RoundingSelector rounding={1} onChange={() => {}} />);

    expect(screen.getByLabelText(/round to/i)).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(4);
    expect(options.map((o) => o.textContent)).toEqual([
      '0.5 kg',
      '1 kg',
      '2.5 kg',
      '5 kg',
    ]);
  });

  it('shows the current rounding value', () => {
    render(<RoundingSelector rounding={2.5} onChange={() => {}} />);

    const select = screen.getByLabelText(/round to/i);
    expect(select.value).toBe('2.5');
  });

  it('calls onChange with correct number', () => {
    const handleChange = vi.fn();
    render(<RoundingSelector rounding={1} onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText(/round to/i), { target: { value: '5' } });
    expect(handleChange).toHaveBeenCalledWith(5);
  });
});
