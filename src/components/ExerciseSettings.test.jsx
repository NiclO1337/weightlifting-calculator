import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import ExerciseSettings from './ExerciseSettings';

describe('ExerciseSettings', () => {
  const exercises = {
    snatch: 40,
    cleanAndJerk: 47,
    frontSquat: 82.5,
    backSquat: 80,
    benchPress: 80,
    deadlift: 130,
    other: 69,
  };

  const renderComponent = (props = {}) => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    return {
      user,
      onChange,
      ...render(
        <ExerciseSettings
          exercises={exercises}
          onChangeExerciseValue={onChange}
          {...props}
        />,
      ),
    };
  };

  it('renders input fields for each exercise', () => {
    renderComponent();
    expect(
      screen.getByRole('textbox', { name: /snatch/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: /deadlift/i }),
    ).toBeInTheDocument();

    const exerciseInputs = screen.getAllByRole('textbox');
    expect(exerciseInputs).toHaveLength(Object.keys(exercises).length);
  });

  it('displays the correct values in the input fields', () => {
    renderComponent();
    expect(screen.getByRole('textbox', { name: /snatch/i })).toHaveValue('40');
    expect(screen.getByRole('textbox', { name: /deadlift/i })).toHaveValue(
      '130',
    );
  });

  it('allows users to type decimal values', async () => {
    const { user } = renderComponent();
    const snatchInput = screen.getByRole('textbox', { name: /snatch/i });

    await user.clear(snatchInput);
    await user.type(snatchInput, '42.5');
    expect(snatchInput).toHaveValue('42.5');
  });

  it('prevents more than one decimal place', async () => {
    const { user } = renderComponent();
    const snatchInput = screen.getByRole('textbox', { name: /snatch/i });

    await user.clear(snatchInput);
    await user.type(snatchInput, '40.55');
    expect(snatchInput).toHaveValue('40.5');
  });

  it('calls onChangeExerciseValue with the correct values', async () => {
    const { user, onChange } = renderComponent();
    const snatchInput = screen.getByRole('textbox', { name: /snatch/i });

    await user.clear(snatchInput);
    await user.type(snatchInput, '42.5');

    expect(onChange).toHaveBeenLastCalledWith({
      ...exercises,
      snatch: 42.5,
    });
  });

  it('allows incomplete decimal values to remain in the input', async () => {
    const { user } = renderComponent();

    const snatchInput = screen.getByRole('textbox', { name: /snatch/i });

    await user.clear(snatchInput);
    await user.type(snatchInput, '40.');

    expect(snatchInput).toHaveValue('40.');
  });

  it('does not call onChange when typing an incomplete decimal', async () => {
    const { user, onChange } = renderComponent();

    const snatchInput = screen.getByRole('textbox', { name: /snatch/i });

    await user.clear(snatchInput);
    await user.type(snatchInput, '40');

    const callsAfter40 = onChange.mock.calls.length;

    await user.type(snatchInput, '.');

    expect(snatchInput).toHaveValue('40.');
    expect(onChange).toHaveBeenCalledTimes(callsAfter40);
  });
});
