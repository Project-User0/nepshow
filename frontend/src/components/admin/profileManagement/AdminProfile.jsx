import { useEffect, useState } from 'react';
import { Edit2, Save, X } from 'lucide-react';
import { fetchCurrentUserAPI, updateCurrentUserAPI, refreshUserState } from '../../../utils/api';

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      try {
        const userData = await fetchCurrentUserAPI();
        setAdminData(userData || {});
        setEditData({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
        });
      } catch (err) {
        setError(err?.message || 'Unable to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleEditClick = () => {
    setError('');
    setSuccessMessage('');
    setEditData({
      name: adminData?.name || '',
      email: adminData?.email || '',
      phone: adminData?.phone || '',
    });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await updateCurrentUserAPI({
        name: editData.name,
        phone: editData.phone,
      });
      const updatedUser = response?.data || {};
      setAdminData(updatedUser);
      await refreshUserState();
      setSuccessMessage('Profile updated successfully.');
      setIsEditing(false);
    } catch (err) {
      setError(err?.message || 'Could not save profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError('');
  };

  if (isLoading && !adminData) {
    return (
      <div className="space-y-6">
        <div className="text-gray-700">Loading admin profile...</div>
      </div>
    );
  }

  if (!adminData) {
    return (
      <div className="space-y-6">
        <div className="text-red-600">Unable to load admin profile.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}
      {successMessage && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">{successMessage}</div>
      )}
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Profile</h1>
        <p className="text-gray-600 mt-1">Manage your administrator profile and settings</p>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Header Background */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>

        {/* Profile Content */}
        <div className="px-6 pb-6">
          {/* Avatar and Name */}
          <div className="flex items-end gap-6 -mt-16 mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full border-4 border-white flex items-center justify-center text-white font-bold text-4xl shadow-lg">
              {adminData.name?.charAt(0)}{adminData.name?.split(' ')[1]?.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900">{adminData.name}</h2>
              <p className="text-gray-600">Administrator</p>
            </div>
            <button
              onClick={isEditing ? handleCancel : handleEditClick}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition ${
                isEditing
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              {isEditing ? (
                <>
                  <X size={20} />
                  Cancel
                </>
              ) : (
                <>
                  <Edit2 size={20} />
                  Edit Profile
                </>
              )}
            </button>
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                ) : (
                  <p className="text-lg text-gray-900 font-semibold">{adminData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    readOnly
                    disabled
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 outline-none transition"
                  />
                ) : (
                  <p className="text-lg text-gray-900 font-semibold">{adminData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                ) : (
                  <p className="text-lg text-gray-900 font-semibold">{adminData.phone || 'Not provided'}</p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <p className="text-lg text-gray-900 font-semibold">System Administration</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                <p className="text-lg text-gray-900 font-semibold">Administrator</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                <p className="text-lg text-gray-900 font-semibold">
                  {adminData.createdAt ? new Date(adminData.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">Professional Bio</label>
            <p className="text-gray-700 leading-relaxed">
              {adminData.bio || 'Manage your administrator profile, update contact details, and keep your account secure.'}
            </p>
          </div>

          {/* Save Button */}
          {isEditing && (
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-blue-400"
              >
                <Save size={20} />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <div>
              <p className="font-medium text-gray-900">Change Password</p>
              <p className="text-sm text-gray-600">Update your password regularly for security</p>
            </div>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition font-medium">
              Change
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <div>
              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition font-medium">
              Enable
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <div>
              <p className="font-medium text-gray-900">Login History</p>
              <p className="text-sm text-gray-600">View your recent login activities</p>
            </div>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition font-medium">
              View
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg hover:bg-red-50 transition">
            <div>
              <p className="font-medium text-red-900">Delete Account</p>
              <p className="text-sm text-red-700">Permanently delete your account and data</p>
            </div>
            <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-medium">
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'Profile Updated', time: '2 hours ago', status: 'success' },
            { action: 'Password Changed', time: '1 week ago', status: 'success' },
            { action: 'Logged In', time: 'Today at 09:30 AM', status: 'success' },
            { action: 'Failed Login Attempt', time: '3 days ago', status: 'warning' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50 transition">
              <div>
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.time}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                activity.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {activity.status === 'success' ? 'Success' : 'Warning'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
