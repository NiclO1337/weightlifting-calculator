import { screen, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import PlatePalette from './PlatePalette';
import { DEFAULT_PLATES } from '../constants/plates';

describe('PlatePalette', () => {
  const renderComponent = (props = {}) => {
    const onSelect = vi.fn();
    const user = userEvent.setup();

    return {
      user,
      onSelect,
      ...render(
        <PlatePalette availablePlates={null} onSelect={onSelect} {...props} />,
      ),
    };
  };

  it('renders a button for every default plate size when none are configured', () => {
    renderComponent();

    expect(screen.getAllByRole('button')).toHaveLength(DEFAULT_PLATES.length);
  });

  it('renders a button only for configured available plates', () => {
    renderComponent({ availablePlates: [20, 10] });

    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('calls onSelect with the clicked plate size', async () => {
    const { user, onSelect } = renderComponent({ availablePlates: [20, 10] });

    await user.click(screen.getByRole('button', { name: /20 kg/i }));

    expect(onSelect).toHaveBeenCalledWith(20);
  });
});
