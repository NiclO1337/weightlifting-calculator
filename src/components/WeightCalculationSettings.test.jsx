import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import WeightCalculationSettings from './WeightCalculationSettings';

describe('WeightCalculationSettings', () => {
  const plateOptions = [25, 20, 15, 10, 5, 2.5, 2, 1.5, 1.25, 1, 0.5];

  it('renders the rounding input', () => {
    render(<WeightCalculationSettings />);
    expect(screen.getByLabelText(/round to/i)).toBeInTheDocument();
  });

  it('renders the barbell weight input', () => {
    render(<WeightCalculationSettings />);
    expect(screen.getByLabelText(/barbell/i)).toBeInTheDocument();
  });

  it('renders the available plates checkboxes', () => {
    render(<WeightCalculationSettings />);

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(plateOptions.length);
  });

  it('renders the reset button', () => {
    render(<WeightCalculationSettings />);
    expect(
      screen.getByRole('button', { name: /reset to default/i }),
    ).toBeInTheDocument();
  });

  it('checkboxes are checked by default', () => {
    render(<WeightCalculationSettings />);
    expect(screen.getByRole('checkbox', { name: `25 kg` })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: `20 kg` })).toBeChecked();
  });

  it('checkboxes are unchecked when not included in availablePlates', () => {
    const availablePlates = [20, 10, 5];
    render(<WeightCalculationSettings availablePlates={availablePlates} />);

    expect(screen.getByRole('checkbox', { name: `25 kg` })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: `20 kg` })).toBeChecked();
  });

  it('reset button calls setAvailablePlates with null', () => {
    const setAvailablePlates = vi.fn();
    render(
      <WeightCalculationSettings setAvailablePlates={setAvailablePlates} />,
    );
    const resetButton = screen.getByRole('button', { name: /reset to default/i });
    fireEvent.click(resetButton);
    expect(setAvailablePlates).toHaveBeenCalledWith(null);
  });

  it('toggling a checked plate removes it from available plates', () => {
    const setAvailablePlates = vi.fn();
    const availablePlates = [20, 10, 5];
    render(
      <WeightCalculationSettings
        availablePlates={availablePlates}
        setAvailablePlates={setAvailablePlates}
      />,
    );
    const plateToToggle = 10;
    const checkbox = screen.getByRole('checkbox', { name: `${plateToToggle} kg` });

    fireEvent.click(checkbox);
    expect(setAvailablePlates).toHaveBeenCalledWith([20, 5]);
  });

  it('toggling an unchecked plate adds it to available plates', () => {
    const setAvailablePlates = vi.fn();
    const availablePlates = [20, 10, 5];
    render(
      <WeightCalculationSettings
        availablePlates={availablePlates}
        setAvailablePlates={setAvailablePlates}
      />,
    );
    const plateToToggle = 15;
    const checkbox = screen.getByRole('checkbox', { name: `${plateToToggle} kg` });

    fireEvent.click(checkbox);
    expect(setAvailablePlates).toHaveBeenCalledWith([20, 15, 10, 5]);
  });
});
