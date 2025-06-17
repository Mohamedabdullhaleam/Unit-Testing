import { useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
};

export function UserList() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!users || users.length === 0) return <div>No users found.</div>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} data-testid="user">
          {user.name}
        </li>
      ))}
    </ul>
  );
}
