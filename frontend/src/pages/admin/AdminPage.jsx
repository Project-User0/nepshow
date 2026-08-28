import { useState } from "react";
import Header from "../../components/admin/shared/Header";
import Sidebar from "../../components/admin/shared/Sidebar";
import Dashboard from "../../components/admin/dashboardManagement/Dashboard";
import MovieManagement from "../../components/admin/movieManagement/MovieManagement";
import PaymentManagement from "../../components/admin/paymentManagement/PaymentManagement";
import UserManagement from "../../components/admin/userManagement/UserManagement";
import AdminProfile from "../../components/admin/profileManagement/AdminProfile";
import { getStoredUser } from "../../utils/authMiddleware";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigate = useNavigate();
  const userData = getStoredUser();
  if (userData.role != "admin") {
    navigate("/login");
  }

  console.log(userData);

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "movies":
        return <MovieManagement />;
      case "payments":
        return <PaymentManagement />;
      case "users":
        return <UserManagement />;
      case "profile":
        return <AdminProfile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

export default AdminPanel;
