import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // ✅ import layout
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Movies from './pages/Movies';
import Favorites from './pages/Favorites';
import Watchlist from './pages/Watchlist';
import UserProfile from './pages/UserProfile';
import MovieDetails from './pages/MovieDetails';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/profile" element={<UserProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
