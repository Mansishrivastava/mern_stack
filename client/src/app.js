// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Fetch users from the server
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users', err);
    }
  };

  // Add a new user
  const addUser = async () => {
    if (!name || !email) {
      alert('Please enter name and email');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/users', { name, email });
      setUsers([...users, response.data]);
      setName('');
      setEmail('');
    } catch (err) {
      console.error('Error adding user', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>MERN Stack Sandbox</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={addUser}>Add User</button>
      </div>
      <h2>Users:</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
