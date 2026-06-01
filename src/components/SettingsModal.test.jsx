import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SettingsModal from './SettingsModal';

describe('SettingsModal', () => {
  it('renders children content', () => {
    render(
      <SettingsModal>
        <div>Test Content</div>
      </SettingsModal>,
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders a close button', () => {
    render(<SettingsModal />);
    expect(screen.getByRole('button', { name: 'Close Settings' })).toBeInTheDocument();
  });
});