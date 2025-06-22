// src/components/Layout.jsx
import { Link } from 'react-router-dom';
import './Layout.css'; // You’ll create this next
import logo from '../assets/Joflicks.png'; // <- Import your logo

function Layout({ children }) {
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

      {/* Page content */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default Layout;
