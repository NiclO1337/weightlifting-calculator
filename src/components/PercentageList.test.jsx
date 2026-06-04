import { screen, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import PercentageList from './PercentageList';

describe('PercentageList', () => {
  const baseProps = {
    oneRepMax: 100,
    rounding: 0.5,
    selectedPercentage: 70,
  };

  it('renders a list of percentage buttons', () => {
    render(<PercentageList {...baseProps} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(9);
  });

  it('displays the correct percentage and weight for each button', () => {
    render(<PercentageList {...baseProps} />);
    expect(screen.getByRole('button', { name: /70% - 70 kg/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /80% - 80 kg/i })).toBeInTheDocument();
  });

  it('highlights the selected percentage', () => {
    render(<PercentageList {...baseProps} />);
    const selectedItem = screen.getByRole('button', { name: /70%/i }).closest('li');
    expect(selectedItem).toHaveClass('highlighted');
  });

  it('calls onSelect with the correct percentage when a button is clicked', async () => {
    const onSelect = vi.fn();
    render(<PercentageList {...baseProps} onSelect={onSelect} />);
    const button = screen.getByRole('button', { name: /80%/i });
    await userEvent.click(button);
    expect(onSelect).toHaveBeenCalledWith(80);
  });
});