import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const BASE_URL = import.meta.env.VITE_BACKEND_URL;
      const res = await axios.post(`${BASE_URL}/api/auth/login`, form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard'); // Change to desired page
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      maxWidth: '400px',
      margin: '0 auto',
      padding: '2rem',
      borderRadius: '8px',
      backgroundColor: '#f4f4f4',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ marginBottom: '1rem' }}>Login</h2>
      <input
        name="username"
        onChange={handleChange}
        placeholder="Username"
        required
        style={{
          display: 'block',
          width: '100%',
          padding: '10px',
          marginBottom: '1rem',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }}
      />
      <input
        name="password"
        type="password"
        onChange={handleChange}
        placeholder="Password"
        required
        style={{
          display: 'block',
          width: '100%',
          padding: '10px',
          marginBottom: '1rem',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }}
      />
      <button type="submit" style={{
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Login
      </button>
    </form>
  );
};

export default LoginPage;
