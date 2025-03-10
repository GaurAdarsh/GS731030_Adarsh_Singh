import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const activeTab = useSelector((state: RootState) => state.sidebar.activeTab);

  const sidebarTabs = [
    { label: "Store", to: "/store",icon:"/store-solid.svg" },
    { label: "SKU", to: "/sku",icon:"/shapes-solid.svg"},
    { label: "Planning", to: "/planning",icon:"/chart-line-solid.svg" },
    { label: "Charts", to: "/charts",icon:"/chart-column-solid.svg" },
  ];
  useEffect(()=>{
},[activeTab])
  return (
    <div className="flex">
      <Sidebar
        tabs={sidebarTabs}
        logoSrc="/gsynergy-logo.png"
        logoAlt="GSynergy Logo"
        logoText="Wo Engineers Business Transformers"
      />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <header className="flex justify-between items-center pb-6">
          <div className="flex-1 flex justify-center">
            <h1 className="text-3xl font-bold">Data Viewer App</h1>
          </div>
          <div className="flex items-center ">
            <img src="/id-badge-solid.svg" alt="User" className="w-6 h-6" />
            <img src="/arrow-down-solid.svg" alt="Arrow Down" className="w-6 h-6" />
          </div>

        </header>
        {children}
      </div>
    </div>
  );
};

export default Layout;