import { useState } from "react";
import {
  Menu,
  Bell,
  Mail,
  LogOut,
  SquareCenterlineDashedHorizontal,
} from "lucide-react";
import { logoutAPI } from "../../../utils/authMiddleware";
import { useNavigate } from "react-router-dom";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showEmails, setShowEmails] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAPI();
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: Menu Toggle */}
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            {sidebarOpen ? (
              <SquareCenterlineDashedHorizontal size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>

        {/* Center: Admin Panel Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        </div>

        {/* Right: Logo, Icons */}
        <div className="flex items-center gap-6">
          {/* Notification Icon */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowEmails(false);
              }}
              className="relative text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Bell size={24} />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4 border-b hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm text-gray-700">New movie uploaded</p>
                    <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                  </div>
                  <div className="p-4 border-b hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm text-gray-700">
                      New user registration
                    </p>
                    <p className="text-xs text-gray-400 mt-1">15 minutes ago</p>
                  </div>
                  <div className="p-4 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm text-gray-700">Payment received</p>
                    <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Email Icon */}
          <div className="relative">
            <button
              onClick={() => {
                setShowEmails(!showEmails);
                setShowNotifications(false);
              }}
              className="relative text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Mail size={24} />
              <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                5
              </span>
            </button>

            {/* Email Dropdown */}
            {showEmails && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Messages</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4 border-b hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm font-medium text-gray-800">
                      User Support
                    </p>
                    <p className="text-xs text-gray-500">
                      Help regarding subscription
                    </p>
                    <p className="text-xs text-gray-400 mt-1">5 minutes ago</p>
                  </div>
                  <div className="p-4 border-b hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm font-medium text-gray-800">
                      Feedback
                    </p>
                    <p className="text-xs text-gray-500">
                      Application feedback
                    </p>
                    <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                  </div>
                  <div className="p-4 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm font-medium text-gray-800">
                      System Alert
                    </p>
                    <p className="text-xs text-gray-500">Backup completed</p>
                    <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Logout Icon */}
          <button
            className="text-gray-600 hover:text-red-600 transition-colors"
            title="Logout"
            onClick={handleLogout}
          >
            <LogOut size={24} />
          </button>

          {/* Logo/Avatar */}
          <div className="w-auto bg-gray-200 rounded-full text-blue-600 flex items-center justify-center font-bold text-[18px] p-2">
            N<span className="text-red-600">P</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
