import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UserList } from '../components/UserList';

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('UserList component', () => {
  it('renders loading state initially', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise(() => {}))
    );
    render(<UserList />);
    expect(screen.getByText(/loading users/i)).toBeInTheDocument();
  });

  it('renders list of users after successful fetch', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              { id: 1, name: 'Alice' },
              { id: 2, name: 'Bob' },
            ]),
        })
      )
    );

    render(<UserList />);
    const users = await screen.findAllByTestId('user');
    expect(users).toHaveLength(2);
    expect(users[0].textContent).toBe('Alice');
    expect(users[1].textContent).toBe('Bob');
  });

  it('renders "No users found." on empty data', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve([]),
        })
      )
    );

    render(<UserList />);
    expect(await screen.findByText(/no users found/i)).toBeInTheDocument();
  });

  it('renders error message on failed fetch', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: false,
        })
      )
    );

    render(<UserList />);
    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });

  it('renders error message on thrown error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('Fetch failed')))
    );

    render(<UserList />);
    expect(await screen.findByText(/fetch failed/i)).toBeInTheDocument();
  });
});
