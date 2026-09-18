import { screen, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import BarbellWeightToggle from './BarbellWeightToggle';

describe('BarbellWeightToggle', () => {
  const renderComponent = (props = {}) => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    return {
      user,
      onChange,
      ...render(
        <BarbellWeightToggle barbellWeight={15} onChange={onChange} {...props} />,
      ),
    };
  };

  it('marks the active barbell weight as pressed', () => {
    renderComponent({ barbellWeight: 20 });

    expect(screen.getByRole('button', { name: /20 kg/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: /15 kg/i })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('calls onChange with the selected barbell weight', async () => {
    const { user, onChange } = renderComponent();

    await user.click(screen.getByRole('button', { name: /20 kg/i }));

    expect(onChange).toHaveBeenCalledWith(20);
  });
});
