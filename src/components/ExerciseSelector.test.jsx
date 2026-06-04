import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ExerciseSelector from './ExerciseSelector';
import { EXERCISE_LABELS, DEFAULT_EXERCISE_MAXES } from '../constants/exercises';

describe('ExerciseSelector', () => {
  const baseProps = {
    exercises: DEFAULT_EXERCISE_MAXES,
    selectedExercise: 'snatch',
  };

  it('renders label and all options', () => {
    render(<ExerciseSelector {...baseProps} />);

    expect(screen.getByLabelText(/exercise/i)).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(Object.keys(EXERCISE_LABELS).length);
  });

  it('renders labels and weights correctly', () => {
    render(<ExerciseSelector {...baseProps} />);

    expect(screen.getByText('Snatch (50 kg)')).toBeInTheDocument();
    expect(screen.getByText('Backsquat (100 kg)')).toBeInTheDocument();
    expect(screen.getByText('Deadlift (130 kg)')).toBeInTheDocument();
  });

  it('shows the selected exercise', () => {
    render(<ExerciseSelector {...baseProps} />);

    const select = screen.getByRole('combobox');
    expect(select.value).toBe('snatch');
  });

  it('calls onChange with selected value', () => {
    const handleChange = vi.fn();

    render(<ExerciseSelector {...baseProps} onChange={handleChange} />);

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'benchPress' },
    });

    expect(handleChange).toHaveBeenCalledWith('benchPress');
  });
});
