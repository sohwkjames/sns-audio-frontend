import { useEffect, useState } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser } from '../api/users';

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: '', password: '', is_admin: false });
  const [editingUserId, setEditingUserId] = useState(null);
  const [error, setError] = useState('');

  const loadUsers = async () => {
    try {
      const res = await fetchUsers();
      setUsers(res.data);
    } catch (err) {
      setError('Failed to load users');
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (editingUserId) {
        await updateUser(editingUserId, form);
      } else {
        await createUser(form);
      }
      setForm({ username: '', password: '', is_admin: false });
      setEditingUserId(null);
      loadUsers();
    } catch (err) {
      setError('Failed to save user');
    }
  };

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setForm({ username: user.username, password: '', is_admin: user.is_admin });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this user?')) {
      try {
        await deleteUser(id);
        loadUsers();
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  return (
    <div>
      <h2>User Management</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <h3>{editingUserId ? 'Edit User' : 'Create New User'}</h3>
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required={!editingUserId} // required only when creating
        />
        <label>
          <input
            type="checkbox"
            checked={form.is_admin}
            onChange={(e) => setForm({ ...form, is_admin: e.target.checked })}
          />
          Is Admin
        </label>
        <button type="submit">Save</button>
        {editingUserId && <button onClick={() => {
          setEditingUserId(null); setForm({ username: '', password: '', is_admin: false });
        }}>Cancel</button>}
      </form>

      <h3>Users</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th><th>Username</th><th>Admin</th><th>Created</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.is_admin ? 'Yes' : 'No'}</td>
              <td>{new Date(u.created_at).toLocaleString()}</td>
              <td>
                <button onClick={() => handleEdit(u)}>Edit</button>
                <button onClick={() => handleDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagementPage;
