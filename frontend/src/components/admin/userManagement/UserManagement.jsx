import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import UserTable from './UserTable';
import CreateUserFormModal from './CreateUserFormModal';
import EditUserFormModal from './EditUserFormModal';
import { createUserAPI, deleteUserAPI, fetchUsersAPI, updateUserAPI } from '../../../utils/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState('');

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await fetchUsersAPI();
      const list = response?.data?.users || [];
      setUsers(list.map((user) => ({
        _id: user._id,
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || '—',
        joinDate: new Date(user.createdAt).toLocaleDateString(),
        status: user.isActive ? 'Active' : 'Inactive',
        subscriptionPlan: user.subscription?.plan || 'free',
        subscription: user.subscription?.isActive
          ? user.subscription?.plan === 'premium'
            ? 'Premium'
            : 'Free'
          : 'Inactive',
        role: user.role,
      })));
    } catch (err) {
      setError(err.message || 'Unable to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAddUser = () => {
    setShowCreateForm(true);
  };

  const handleSaveUser = async (userData) => {
    try {
      const response = await createUserAPI(userData);
      if (response.success) {
        setShowCreateForm(false);
        loadUsers();
      }
    } catch (err) {
      setError(err.message || 'Unable to create user');
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditForm(true);
    setError('');
  };

  const handleUpdateUser = async (userData) => {
    if (!selectedUser) return;

    try {
      const payload = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: userData.role,
        subscriptionPlan: userData.subscription,
        subscriptionIsActive: userData.status === 'Active',
        isActive: userData.status === 'Active',
      };

      const response = await updateUserAPI(selectedUser.id, payload);
      if (response.success) {
        setShowEditForm(false);
        setSelectedUser(null);
        loadUsers();
      }
    } catch (err) {
      setError(err.message || 'Unable to update user');
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUserAPI(id);
        loadUsers();
      } catch (err) {
        setError(err.message || 'Unable to delete user');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage all registered users</p>
        </div>
        <button
          onClick={handleAddUser}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          <Plus size={20} />
          Add User
        </button>
      </div>

      {error && <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
      {loading ? <div className="rounded-lg bg-white p-6 text-gray-600">Loading users...</div> : <UserTable users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />}

      {showCreateForm && (
        <CreateUserFormModal
          isOpen={showCreateForm}
          onClose={() => setShowCreateForm(false)}
          onSave={handleSaveUser}
        />
      )}

      {showEditForm && selectedUser && (
        <EditUserFormModal
          user={selectedUser}
          isOpen={showEditForm}
          onClose={() => {
            setShowEditForm(false);
            setSelectedUser(null);
          }}
          onSave={handleUpdateUser}
        />
      )}
    </div>
  );
};

export default UserManagement;
