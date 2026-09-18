import { screen, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import FreeCalc from './FreeCalc';

describe('FreeCalc', () => {
  const renderComponent = (props = {}) => {
    const user = userEvent.setup();
    const setBarbellWeight = vi.fn();

    return {
      user,
      setBarbellWeight,
      ...render(
        <FreeCalc
          barbellWeight={20}
          setBarbellWeight={setBarbellWeight}
          availablePlates={[20, 10]}
          {...props}
        />,
      ),
    };
  };

  const getTotal = () => screen.getByText(/kg/i, { selector: '.free-calc-total' });

  it('shows the barbell weight as the total when no plates are loaded', () => {
    renderComponent();

    expect(getTotal()).toHaveTextContent('20 kg');
  });

  it('adds a plate to each side when a palette plate is clicked', async () => {
    const { user } = renderComponent();

    await user.click(screen.getByRole('button', { name: /add 20 kg plate/i }));

    expect(getTotal()).toHaveTextContent('60 kg');
  });

  it('removes a plate when clicked on the bar', async () => {
    const { user } = renderComponent();

    await user.click(screen.getByRole('button', { name: /add 20 kg plate/i }));
    expect(getTotal()).toHaveTextContent('60 kg');

    await user.click(screen.getByRole('button', { name: /remove 20 kg plate/i }));

    expect(getTotal()).toHaveTextContent('20 kg');
  });

  it('clears all plates when the clear bar button is clicked', async () => {
    const { user } = renderComponent();

    await user.click(screen.getByRole('button', { name: /add 10 kg plate/i }));
    await user.click(screen.getByRole('button', { name: /add 20 kg plate/i }));

    await user.click(screen.getByRole('button', { name: /clear bar/i }));

    expect(getTotal()).toHaveTextContent('20 kg');
  });

  it('calls setBarbellWeight when a different barbell weight is selected', async () => {
    const { user, setBarbellWeight } = renderComponent();

    await user.click(screen.getByRole('button', { name: /^15 kg$/i }));

    expect(setBarbellWeight).toHaveBeenCalledWith(15);
  });
});
