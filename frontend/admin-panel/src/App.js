import React, { useState } from 'react';
import Dashboard from './components/Dashboard';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    fetch('http://localhost:5000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(response => {
        if (response.ok) {
          setLoggedIn(true);
        } else {
          alert('Invalid credentials');
        }
      })
      .catch(error => console.error('Error during admin login:', error));
  };

  return (
    <div className="App">
      {loggedIn ? (
        <Dashboard />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitLogin = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div>
      <h2>Admin Panel Login</h2>
      <form onSubmit={submitLogin}>
        <div>
          <label>Username: </label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default App;
