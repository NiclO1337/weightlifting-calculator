import { screen, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import SavedPercentages from './SavedPercentages';

describe('SavedPercentages', () => {
  const renderComponent = (props = {}) => {
      const onRemove = vi.fn();
      const user = userEvent.setup();

      return {
        user,
        onRemove,
        ...render(
          <SavedPercentages
            oneRepMax={100}
            percentages = {[70, 80]}
            onRemove={onRemove}
            {...props}
          />,
        ),
      };
    };

  it('renders the correct number of percentage items', () => {
    renderComponent();

    const percentageItems = screen.getAllByRole('listitem');
    expect(percentageItems).toHaveLength(2);
  });

  it('does not display the remove button when an item is not selected', () => {
    renderComponent();

    const removeButtons = screen.queryAllByRole('button', { name: /remove/i });
    expect(removeButtons).toHaveLength(0);
  });

  it('displays the remove button when an item is selected', async () => {
    const { user } = renderComponent();

    const percentageButton = screen.getByRole('button', { name: /70%/i })
    await user.click(percentageButton);

    const removeButton = screen.getByRole('button', { name: /remove/i });
    expect(removeButton).toBeInTheDocument();
  });

  it('calls onRemove with the correct percentage when the remove button is clicked', async () => {
    const { user, onRemove } = renderComponent();

    const percentageButton = screen.getByRole('button', { name: /70%/i })
    await user.click(percentageButton);

    const removeButton = screen.getByRole('button', { name: /remove/i });
    await user.click(removeButton);

    expect(onRemove).toHaveBeenCalledWith(70);
  });
});