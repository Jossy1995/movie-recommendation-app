// src/components/Layout.jsx
import { Link, Outlet } from 'react-router-dom';
import './Layout.css';
import logo from '../assets/Joflicks.png';

function Layout() {
  return (
    <div className="app-layout">
      {/* Navbar */}
      <nav className="navbar">
        <div>
          <Link to="/">
            <img src={logo} alt="JoFlicks Logo" className="logo-img" />
          </Link>
        </div>
        <div className="nav-buttons">
          <Link to="/login" className="nav-btn">Login</Link>
          <Link to="/signup" className="nav-btn signup">Sign Up</Link>
        </div>
      </nav>

      {/* Main page content */}
      <main style={{ flexGrow: 1, padding: '20px' }}>
        <Outlet /> {/* ✅ This tells React Router to render the current route */}
      </main>
    </div>
  );
}

export default Layout;
