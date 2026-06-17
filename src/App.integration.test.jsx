import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  const renderComponent = (props = {}) => {
    const user = userEvent.setup();

    return {
      user,
      ...render(<App {...props} />),
    };
  };

  it('renders percentage details when range is selected', async () => {
    const { user } = renderComponent();

    await user.click(screen.getByRole('button', { name: /80%/i }));

    expect(screen.getByText(/85%/i)).toBeInTheDocument();
  });

  it('renders new calculations when selected exercise changes', async () => {
    const { user } = renderComponent();

    const selectExercise = screen.getByRole('combobox', {
      name: /exercise/i,
    });

    await user.selectOptions(selectExercise, 'snatch');

    const oldValue = screen.getByText(/80%/).textContent;

    await user.selectOptions(selectExercise, 'backSquat');

    const newValue = screen.getByText(/80%/).textContent;

    expect(selectExercise).toHaveValue('backSquat');

    expect(oldValue).not.toBe(newValue);
  });

  it('saves percentage to list when clicking on button', async () => {
    const { user } = renderComponent();

    const savedSection = screen.getByRole('region', {
      name: /Saved percentages/i,
    });

    expect(savedSection).not.toHaveTextContent(/75%/i);

    await user.click(screen.getByRole('button', { name: /75%/i }));

    expect(savedSection).toHaveTextContent(/75%/i);
  });

  it('removing saved percentage removes it from the list', async () => {
    const { user } = renderComponent();

    await user.click(screen.getByRole('button', { name: /75%/i }));


    const savedSection = screen.getByRole('region', {
      name: /Saved percentages/i,
    });

    expect(savedSection).toHaveTextContent(/75%/i);

    const savedItem = within(savedSection).getByText(/75%/i);

    await user.click(savedItem);

    const removeButton = within(savedItem).getByRole('button', {
      name: /remove/i,
    });

    await user.click(removeButton);

    expect(savedSection).not.toHaveTextContent(/75%/i);
  });
});



// ✓ settings persist to localStorage

// ✓ changing barbell weight changes plate loading
