import React, { useState } from 'react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage('Email and password are required.');
      return;
    }

    // Fake login logic
    if (email === 'test@example.com' && password === 'password123') {
      setMessage('Login successful!');
    } else {
      setMessage('Invalid credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setMessage(null);
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setMessage(null);
            setPassword(e.target.value);
          }}
        />
      </div>
      <button type="submit">Login</button>
      {message && <div role="alert">{message}</div>}
    </form>
  );
}
