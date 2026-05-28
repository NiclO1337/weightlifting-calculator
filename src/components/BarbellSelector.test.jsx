import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import BarbellSelector from './BarbellSelector';

describe('BarbellSelector', () => {
  it('renders labels and options', () => {
    render(<BarbellSelector barbellWeight={15} onChange={() => {}} />);

    expect(screen.getByLabelText(/Barbell/i)).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(2);
    expect(options.map((option) => option.textContent)).toEqual([
      '15 kg',
      '20 kg',
    ]);
  })

  it('shows the current barbell weight', () => {
    render(<BarbellSelector barbellWeight={15} onChange={() => {}} />);
    const select = screen.getByLabelText(/barbell/i);
    expect(select.value).toBe('15');
  })

  it('calls onChange with correct number', () => {
    const handleChange = vi.fn();
    render(<BarbellSelector barbellWeight={15} onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText(/barbell/i), { target: { value: '20' } });
    expect(handleChange).toHaveBeenCalledWith(20);
  })
})
