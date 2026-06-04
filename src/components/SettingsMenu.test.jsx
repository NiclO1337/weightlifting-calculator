import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { userEvent } from '@testing-library/user-event';
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

  const renderComponent = (props = {}) => {
    const user = userEvent.setup();
    return {
      user,
      ...render(<SettingsMenu exercises={exercises} {...props} />),
    };
  };

  it('renders the settings button', () => {
    renderComponent();

    const settingsButton = screen.getByRole('button', {
      name: 'Open Settings',
    });
    expect(settingsButton).toBeInTheDocument();
  });

  it('does not render the settings modal by default', () => {
    renderComponent();

    const modal = screen.queryByRole('dialog');
    expect(modal).not.toBeInTheDocument();
  });

  it('opens the settings modal when the button is clicked', async () => {
    const { user } = renderComponent();

    const settingsButton = screen.getByRole('button', {
      name: 'Open Settings',
    });

    await user.click(settingsButton);
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
  });

  it('closes the settings modal when the close button is clicked', async () => {
    const { user } = renderComponent();

    const settingsButton = screen.getByRole('button', {
      name: 'Open Settings',
    });
    await user.click(settingsButton);

    const modal = screen.getByRole('dialog');
    const closeButton = screen.getByRole('button', {
      name: 'Close Settings',
    });
    await user.click(closeButton);
    expect(modal).not.toBeInTheDocument();
  });

  it('closes the settings modal when clicking outside the panel', async () => {
    const { user } = renderComponent();

    const settingsButton = screen.getByRole('button', {
      name: 'Open Settings',
    });
    await user.click(settingsButton);

    const modal = screen.getByRole('dialog');
    await user.click(modal);
    expect(modal).not.toBeInTheDocument();
  });
});
