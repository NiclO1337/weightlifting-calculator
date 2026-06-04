import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import WeightCalculationSettings from './WeightCalculationSettings';

describe('WeightCalculationSettings', () => {
  const plateOptions = [25, 20, 15, 10, 5, 2.5, 2, 1.5, 1.25, 1, 0.5];
  const availableTestPlates = [20, 10, 5];

  const renderComponent = (props = {}) => {
    const setAvailablePlates = vi.fn();
    const user = userEvent.setup();
    return {
      user,
      setAvailablePlates,
      ...render(
        <WeightCalculationSettings
          setAvailablePlates={setAvailablePlates}
          {...props}
        />,
      ),
    };
  };

  it('renders the rounding input', () => {
    renderComponent();

    expect(screen.getByLabelText(/round to/i)).toBeInTheDocument();
  });

  it('renders the barbell weight input', () => {
    renderComponent();

    expect(screen.getByLabelText(/barbell/i)).toBeInTheDocument();
  });

  it('renders the available plates checkboxes', () => {
    renderComponent();

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(plateOptions.length);
  });

  it('renders the reset button', () => {
    renderComponent();

    expect(
      screen.getByRole('button', { name: /reset to default/i }),
    ).toBeInTheDocument();
  });

  it('checkboxes are checked by default', () => {
    renderComponent();

    expect(screen.getByRole('checkbox', { name: `25 kg` })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: `20 kg` })).toBeChecked();
  });

  it('checkboxes are unchecked when not included in availablePlates', () => {
    renderComponent({ availablePlates: availableTestPlates });

    expect(screen.getByRole('checkbox', { name: `25 kg` })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: `20 kg` })).toBeChecked();
  });

  it('reset button calls setAvailablePlates with null', async () => {
    const { user, setAvailablePlates } = renderComponent();

    const resetButton = screen.getByRole('button', {
      name: /reset to default/i,
    });
    await user.click(resetButton);
    expect(setAvailablePlates).toHaveBeenCalledWith(null);
  });

  it('toggling a checked plate removes it from available plates', async () => {
    const { user, setAvailablePlates } = renderComponent({
      availablePlates: availableTestPlates,
    });

    const plateToToggle = 10;
    const checkbox = screen.getByRole('checkbox', {
      name: `${plateToToggle} kg`,
    });

    await user.click(checkbox);
    expect(setAvailablePlates).toHaveBeenCalledWith([20, 5]);
  });

  it('toggling an unchecked plate adds it to available plates', async () => {
    const { user, setAvailablePlates } = renderComponent({
      availablePlates: availableTestPlates,
    });

    const plateToToggle = 15;
    const checkbox = screen.getByRole('checkbox', {
      name: `${plateToToggle} kg`,
    });

    await user.click(checkbox);
    expect(setAvailablePlates).toHaveBeenCalledWith([20, 15, 10, 5]);
  });
});
