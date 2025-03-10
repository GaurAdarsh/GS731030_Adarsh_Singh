import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTab } from "../reducers/sidebarReducer";
import { RootState } from "../store";

interface SidebarTab {
  label: string;
  to: string;
  icon: string;
}

interface SidebarProps {
  tabs: SidebarTab[];
  logoSrc: string;
  logoAlt: string;
  logoText: string;
}

const Sidebar: React.FC<SidebarProps> = ({ tabs, logoAlt }) => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state: RootState) => state.sidebar.activeTab);
  const location = useLocation();

  const handleTabClick = (label: string) => {
    dispatch(setActiveTab(label));
  };

  useEffect(() => {
    const matchingTab = tabs.find((tab) => location.pathname.includes(tab.to));
    if (matchingTab) {
      dispatch(setActiveTab(matchingTab.to));
    }
  }, [dispatch, location.pathname, tabs]);

  return (
    <aside className="bg-gray-100 p-4 w-64 min-h-screen flex flex-col">
      {/* Logo Section */}
      <div className="flex items-center space-x-2 mb-6">
        <img src="/Gsynergy-Logo.svg"alt={logoAlt} className="h-20 w-auto" />
      </div>

      {/* Navigation Tabs */}
      <nav className="flex-1">
        {tabs.map((tab) => (
          <Link
            key={tab.label}
            to={tab.to}
            className={`flex items-center py-2 px-4 rounded-lg space-x-3 ${
              activeTab === tab.to ? "bg-gray-200 font-semibold" : "hover:bg-gray-200"
            }`}
            onClick={() => handleTabClick(tab.to)}
          >
            <img src={tab.icon} alt={tab.label} className="h-6 w-6" />
            <span className="text-lg">{tab.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
