import { screen, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import PlatePalette from './PlatePalette';
import { PLATE_OPTIONS } from '../constants/plates';

describe('PlatePalette', () => {
  const renderComponent = (props = {}) => {
    const onSelect = vi.fn();
    const user = userEvent.setup();

    return {
      user,
      onSelect,
      ...render(
        <PlatePalette onSelect={onSelect} {...props} />,
      ),
    };
  };

  it('renders a button for every plate size', () => {
    renderComponent();

    expect(screen.getAllByRole('button')).toHaveLength(PLATE_OPTIONS.length);
  });

  it('ignores the configured available plates', () => {
    renderComponent({ availablePlates: [20, 10] });

    expect(screen.getAllByRole('button')).toHaveLength(PLATE_OPTIONS.length);
  });

  it('calls onSelect with the clicked plate size', async () => {
    const { user, onSelect } = renderComponent();

    await user.click(screen.getByRole('button', { name: /20 kg/i }));

    expect(onSelect).toHaveBeenCalledWith(20);
  });
});
