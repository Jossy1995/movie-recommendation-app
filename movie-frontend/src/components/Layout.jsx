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
      <main className="main-content">
  <section className="welcome-section">
    <h1>Welcome to JoFlicks 🍿</h1>
    <p>Discover movies, build your favorites & watchlist, and share reviews.</p>
  </section>

  <section className="featured-section">
    <h2>Featured Movies</h2>
    {/* You can fetch and map movie cards here */}
  </section>

  <Outlet />
</main>

    </div>
  );
}

export default Layout;
