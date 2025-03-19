import Topbar from "../Shared/Topbar";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import Sidebar from "../Shared/Sidebar";

const DashboardLayout = () => {
  const userRole = JSON.parse(localStorage.getItem("home_care_user"));
  const location = useLocation();

  const defaultUrl = userRole?.role === "admin" ? "/admin" : "/";
  const normalizedPath = location.pathname.replace(defaultUrl, "");

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-screen bg-ribg-primary-color ">
      <ScrollRestoration />

      <div className="flex !bg-primary-color">
        <Sidebar
          normalizedPath={normalizedPath}
          collapsed={collapsed}
          userRole={userRole}
        />
        <Layout>
          <Header
            style={{
              background: "#F9FAFB",
              position: "sticky",
              top: 0,
              zIndex: 999,
              marginLeft: 0,
            }}
            className="!px-0 "
          >
            <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
          </Header>
          <Content>
            <div className="bg-primary-color px-2 xl:px-5 py-4 xl:py-5">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </div>
    </div>
  );
};
export default DashboardLayout;
