import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Header from './Header';

describe('Header', () => {
  it('renders the header title', () => {
    render(<Header />);
    expect(screen.getByRole('heading', { name: /weightlifting calculator/i })).toBeInTheDocument();
  });

  it('renders tutorial button', () => {
    render(<Header />);
    expect(screen.getByRole('button', { name: /tutorial/i })).toBeInTheDocument();
  });
});