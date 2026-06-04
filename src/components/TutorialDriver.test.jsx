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
});
