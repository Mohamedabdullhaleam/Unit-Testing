import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { LoginForm } from '../components/LoginForm';

describe('<LoginForm />', () => {
  beforeEach(() => {
    afterEach(cleanup);
  });

  it('renders email and password inputs and a login button', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows error if form is submitted empty', () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Email and password are required.'
    );
  });

  it('shows error for invalid credentials', () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid credentials.');
  });

  it('shows success message for valid credentials', () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByRole('alert')).toHaveTextContent('Login successful!');
  });

  it('clears message when user types again', () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByRole('alert')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'new@example.com' },
    });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
