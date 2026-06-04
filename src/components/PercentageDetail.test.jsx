import { screen, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import PercentageDetail from './PercentageDetail';

describe('PercentageDetail', () => {
  it('renders the percentage and weight correctly', () => {
    render(<PercentageDetail percentage={70} oneRepMax={100} />);

    expect(screen.getByRole('button', { name: /70%/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /70 kg/i })).toBeInTheDocument();
  });

  it('calls onSave when the component is clicked', async () => {
    const onSave = vi.fn();
    const user = userEvent.setup();
    render(
      <PercentageDetail
        percentage={70}
        oneRepMax={100}
        onSave={onSave}
      />,
    );
    const component = screen.getByRole('button', { name: /70%/i });
    await user.click(component);

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith(70);
  });
});
