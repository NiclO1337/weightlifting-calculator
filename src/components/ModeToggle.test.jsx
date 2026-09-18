import { screen, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import ModeToggle from './ModeToggle';

describe('ModeToggle', () => {
  const renderComponent = (props = {}) => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    return {
      user,
      onChange,
      ...render(<ModeToggle mode='oneRM' onChange={onChange} {...props} />),
    };
  };

  it('marks the active mode as pressed', () => {
    renderComponent({ mode: 'freeCalc' });

    expect(
      screen.getByRole('button', { name: /free calc/i }),
    ).toHaveAttribute('aria-pressed', 'true');
    expect(
      screen.getByRole('button', { name: /1rm calculator/i }),
    ).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls onChange with the selected mode', async () => {
    const { user, onChange } = renderComponent();

    await user.click(screen.getByRole('button', { name: /free calc/i }));

    expect(onChange).toHaveBeenCalledWith('freeCalc');
  });
});
