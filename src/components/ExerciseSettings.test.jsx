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

  it('renders input fields for each exercise', () => {
    render(<ExerciseSettings exercises={exercises} />);
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
    render(<ExerciseSettings exercises={exercises} />);
    expect(screen.getByRole('textbox', { name: /snatch/i })).toHaveValue('40');
    expect(screen.getByRole('textbox', { name: /deadlift/i })).toHaveValue(
      '130',
    );
  });

  it('allows users to type decimal values', async () => {
    const onChangeExerciseValue = vi.fn();

    render(
      <ExerciseSettings
        exercises={exercises}
        onChangeExerciseValue={onChangeExerciseValue}
      />,
    );
    const snatchInput = screen.getByRole('textbox', { name: /snatch/i });

    await userEvent.clear(snatchInput);
    await userEvent.type(snatchInput, '42.5');
    expect(snatchInput).toHaveValue('42.5');
  });

  it('prevents more than one decimal place', async () => {
    const onChangeExerciseValue = vi.fn();

    render(
      <ExerciseSettings
        exercises={exercises}
        onChangeExerciseValue={onChangeExerciseValue}
      />,
    );
    const snatchInput = screen.getByRole('textbox', { name: /snatch/i });

    await userEvent.clear(snatchInput);
    await userEvent.type(snatchInput, '40.55');
    expect(snatchInput).toHaveValue('40.5');
  });

  it('calls onChangeExerciseValue with the correct values', async () => {
    const onChangeExerciseValue = vi.fn();
    render(
      <ExerciseSettings
        exercises={exercises}
        onChangeExerciseValue={onChangeExerciseValue}
      />,
    );
    const snatchInput = screen.getByRole('textbox', { name: /snatch/i });

    await userEvent.clear(snatchInput);
    await userEvent.type(snatchInput, '42.5');

    expect(onChangeExerciseValue).toHaveBeenCalledWith({
      ...exercises,
      snatch: 42.5,
    });
  });

  it('allows incomplete decimal values to remain in the input', async () => {
    const onChangeExerciseValue = vi.fn();
    render(
      <ExerciseSettings
        exercises={exercises}
        onChangeExerciseValue={onChangeExerciseValue}
      />,
    );
    const snatchInput = screen.getByRole('textbox', { name: /snatch/i });

    await userEvent.clear(snatchInput);
    await userEvent.type(snatchInput, '40.');

    expect(snatchInput).toHaveValue('40.');
  });

  it('does not update the parent when typing an incomplete decimal', async () => {
    const onChangeExerciseValue = vi.fn();
    render(
      <ExerciseSettings
        exercises={exercises}
        onChangeExerciseValue={onChangeExerciseValue}
      />,
    );
    const snatchInput = screen.getByRole('textbox', { name: /snatch/i });

    await userEvent.clear(snatchInput);
    await userEvent.type(snatchInput, '40');

    const callsAfter40 = onChangeExerciseValue.mock.calls.length;

    await userEvent.type(snatchInput, '.');

    expect(snatchInput).toHaveValue('40.');
    expect(onChangeExerciseValue).toHaveBeenCalledTimes(callsAfter40);
  });
});
