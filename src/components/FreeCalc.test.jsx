import { MAX_PLATES_PER_SIDE } from '../constants/plates';
import { screen, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import FreeCalc from './FreeCalc';

describe('FreeCalc', () => {
  beforeEach(() => {
    localStorage.setItem('freeCalcPlates', JSON.stringify([]));
  });

  afterEach(() => {
    localStorage.clear();
  });

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

  it('starts with two 20 kg plates when nothing is stored', () => {
    localStorage.clear();
    renderComponent();

    expect(getTotal()).toHaveTextContent('100 kg');
    expect(
      screen.getAllByRole('button', { name: /remove 20 kg plate/i }),
    ).toHaveLength(2);
  });

  it('restores stored plates on load', () => {
    localStorage.setItem('freeCalcPlates', JSON.stringify([10, 5]));
    renderComponent();

    expect(getTotal()).toHaveTextContent('50 kg');
  });

  it('saves plate changes to local storage', async () => {
    const { user } = renderComponent();

    await user.click(screen.getByRole('button', { name: /add 10 kg plate/i }));

    expect(JSON.parse(localStorage.getItem('freeCalcPlates'))).toEqual([10]);
  });

  describe('plate limit', () => {
    const fillBar = () =>
      localStorage.setItem(
        'freeCalcPlates',
        JSON.stringify(Array(MAX_PLATES_PER_SIDE).fill(1)),
      );

    it('shows an error and does not add a plate when the bar is full', async () => {
      fillBar();
      const { user } = renderComponent();

      await user.click(screen.getByRole('button', { name: /add 20 kg plate/i }));

      expect(screen.getByRole('alert')).toHaveTextContent(/bar is full/i);
      expect(getTotal()).toHaveTextContent('40 kg');
    });

    it('does not show an error while the bar has room', async () => {
      const { user } = renderComponent();

      await user.click(screen.getByRole('button', { name: /add 20 kg plate/i }));

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('hides the error when a plate is removed', async () => {
      fillBar();
      const { user } = renderComponent();

      await user.click(screen.getByRole('button', { name: /add 20 kg plate/i }));
      await user.click(
        screen.getAllByRole('button', { name: /remove 1 kg plate/i })[0],
      );

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('hides the error when the bar is cleared', async () => {
      fillBar();
      const { user } = renderComponent();

      await user.click(screen.getByRole('button', { name: /add 20 kg plate/i }));
      await user.click(screen.getByRole('button', { name: /clear bar/i }));

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });
});
