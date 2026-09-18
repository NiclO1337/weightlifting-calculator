import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import TutorialDriver from './TutorialDriver';
import { driver } from 'driver.js';

const mockDrive = vi.fn();

vi.mock('driver.js', () => ({
  driver: vi.fn(() => ({
    drive: mockDrive,
  })),
}));

describe('TutorialDriver', () => {
  it('creates a tutorial driver when started', () => {
    const ref = createRef();

    render( <TutorialDriver ref={ref} /> );

    ref.current.start();
    expect(driver).toHaveBeenCalled();
    expect(mockDrive).toHaveBeenCalled();
  });

  it('includes the 1RM-specific steps by default', () => {
    const ref = createRef();
    render(<TutorialDriver ref={ref} />);

    ref.current.start();

    const { steps } = driver.mock.calls.at(-1)[0];
    expect(steps.some((step) => step.element === '#exercise-select')).toBe(true);
    expect(steps.some((step) => step.element === '.plate-palette')).toBe(false);
  });

  it('includes the Free Calc-specific steps when in freeCalc mode', () => {
    const ref = createRef();
    render(<TutorialDriver ref={ref} mode='freeCalc' />);

    ref.current.start();

    const { steps } = driver.mock.calls.at(-1)[0];
    expect(steps.some((step) => step.element === '.plate-palette')).toBe(true);
    expect(steps.some((step) => step.element === '#exercise-select')).toBe(false);
  });

  it('always includes the mode toggle step', () => {
    const ref = createRef();
    render(<TutorialDriver ref={ref} mode='freeCalc' />);

    ref.current.start();

    const { steps } = driver.mock.calls.at(-1)[0];
    expect(steps.some((step) => step.element === '.mode-toggle')).toBe(true);
  });
});
