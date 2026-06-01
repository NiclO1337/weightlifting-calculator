import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SettingsMenu from './SettingsMenu';

describe('SettingsMenu', () => {
  const exercises = {
    snatch: 40,
    cleanAndJerk: 47,
    frontSquat: 82.5,
    backSquat: 80,
    benchPress: 80,
    deadlift: 130,
    other: 69,
  };

  it('renders the settings button', () => {
    render(<SettingsMenu />);

    const settingsButton = screen.getByRole('button', {
      name: 'Open Settings',
    });
    expect(settingsButton).toBeInTheDocument();
  });

  it('does not render the settings modal by default', () => {
    render(<SettingsMenu />);

    const modal = screen.queryByRole('dialog');
    expect(modal).not.toBeInTheDocument();
  });

  it('opens the settings modal when the button is clicked', () => {
    render(<SettingsMenu exercises={exercises} />);

    const settingsButton = screen.getByRole('button', {
      name: 'Open Settings',
    });

    fireEvent.click(settingsButton);
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
  });

  it('closes the settings modal when the close button is clicked', () => {
    render(<SettingsMenu exercises={exercises} />);

    const settingsButton = screen.getByRole('button', {
      name: 'Open Settings',
    });
    fireEvent.click(settingsButton);

    const modal = screen.getByRole('dialog');
    const closeButton = screen.getByRole('button', {
      name: 'Close Settings',
    });
    fireEvent.click(closeButton);
    expect(modal).not.toBeInTheDocument();
  });

  it('closes the settings modal when clicking outside the panel', () => {
    render(<SettingsMenu exercises={exercises} />);

    const settingsButton = screen.getByRole('button', {
      name: 'Open Settings',
    });
    fireEvent.click(settingsButton);
    const modal = screen.getByRole('dialog');
    fireEvent.click(modal);
    expect(modal).not.toBeInTheDocument();
    });
});
