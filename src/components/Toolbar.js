import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Toolbar() {
  const { user, logout } = useAuth();
  
  const isAdmin = user?.isAdmin;
  console.log('user', user)
  return (
    <nav className="toolbar">
      {user && (
        <div>
          Logged in as: {user.username}
          &nbsp; <button onClick={logout}>Logout</button>
        </div>
      )}
      <ul>
        <li><Link to="/login">Login</Link></li>
        {isAdmin && <li><Link to="/users">User Management</Link></li>}
        {user && <li><Link to="/audios">Audio Management</Link></li>}
      </ul>
    </nav>
  );
}

export default Toolbar;
