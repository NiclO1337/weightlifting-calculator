import { screen, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import BarbellVisualization from './BarbellVisualization';

describe('BarbellVisualization', () => {
  it('renders plates without interactive roles when onPlateClick is not provided', () => {
    render(<BarbellVisualization plates={[20, 10]} />);

    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  it('renders each plate as a clickable button when onPlateClick is provided', () => {
    const onPlateClick = vi.fn();
    render(
      <BarbellVisualization plates={[20, 10]} onPlateClick={onPlateClick} />,
    );

    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('calls onPlateClick with the clicked plate index', async () => {
    const onPlateClick = vi.fn();
    const user = userEvent.setup();
    render(
      <BarbellVisualization plates={[20, 10]} onPlateClick={onPlateClick} />,
    );

    const plateButtons = screen.getAllByRole('button', {
      name: /remove/i,
    });
    await user.click(plateButtons[1]);

    expect(onPlateClick).toHaveBeenCalledWith(1);
  });

  it('calls onPlateClick when a plate is activated with the keyboard', async () => {
    const onPlateClick = vi.fn();
    const user = userEvent.setup();
    render(
      <BarbellVisualization plates={[20]} onPlateClick={onPlateClick} />,
    );

    const plateButton = screen.getByRole('button', { name: /remove/i });
    plateButton.focus();
    await user.keyboard('{Enter}');

    expect(onPlateClick).toHaveBeenCalledWith(0);
  });
});
