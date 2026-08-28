import {
  LayoutDashboard,
  Film,
  CreditCard,
  Users,
  User,
  ChevronRight,
} from "lucide-react";
import { nepshow } from "../../../images";

const Sidebar = ({
  activeSection,
  setActiveSection,
  sidebarOpen,
}) => {
  const menuItems = [
    {
      id: "dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      description: "Overview & Analytics",
    },
    {
      id: "movies",
      icon: Film,
      label: "Movies",
      description: "Manage Movies",
    },
    {
      id: "payments",
      icon: CreditCard,
      label: "Payments",
      description: "Payment Records",
    },
    {
      id: "users",
      icon: Users,
      label: "Users",
      description: "User Management",
    },
    {
      id: "profile",
      icon: User,
      label: "Admin Profile",
      description: "Profile Settings",
    },
  ];

  return (
    <aside
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      }  bg-black bg-opacity-90 text-white transition-all duration-300 ease-in-out overflow-y-auto`}
    >
      {/* Sidebar Header */}
      <div className="px-6 py-[14px] border-b border-gray-700">
        <div className="flex items-center justify-center">
          {sidebarOpen ? (
            <img
              src={nepshow}
              alt="Logo"
              className={`h-12 transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0"}`}
            />
          ) : (
            <div className="w-12 bg-white rounded-full text-blue-600 flex items-center justify-center font-bold p-2 text-[20px]">
              N<span className="text-red-600">P</span>
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
              title={sidebarOpen ? "" : item.label}
            >
              <Icon size={20} className="flex-shrink-0" />

              {sidebarOpen && (
                <div className="ml-3 flex-1 text-left">
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-gray-400 group-hover:text-gray-300">
                    {item.description}
                  </p>
                </div>
              )}

              {sidebarOpen && isActive && (
                <ChevronRight size={18} className="flex-shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
