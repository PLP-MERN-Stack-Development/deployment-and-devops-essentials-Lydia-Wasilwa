import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

export default function Navbar() {
  const linkClass = 'px-3 py-2 hover:underline transition';
  
  // global authentication state/functions
  const { user, isAuthenticated, logout } = useAuth(); 
  const navigate = useNavigate();

  function handleLogout() {
    logout(); // Calls the context logout function which updates the global state
    navigate('/login');
  }

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold">
        Blog App
      </Link>
      <div className="flex items-center gap-4">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>

        {/* Use the isAuthenticated boolean for conditional rendering */}
        {isAuthenticated ? (
          <>
            {/* Show only when logged in */}
            <NavLink to="/categories" className={linkClass}>
              Categories
            </NavLink>
            <NavLink to="/create" className={linkClass}>
              Create Post
            </NavLink>
            {/* ✅ Show logged-in user */}
            <span className="text-gray-300">
              Hi, <span className="font-semibold text-white">{user?.name}</span>
            </span>
            <button
              onClick={handleLogout} 
              className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Show only when not logged in */}
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
            <NavLink to="/register" className={linkClass}>
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
