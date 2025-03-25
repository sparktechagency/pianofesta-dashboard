import Topbar from "../Shared/Topbar";
import {
  Link,
  NavLink,
  Outlet,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import { Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import logout from "/images/dashboard-logo/logout.svg";
import getActiveKeys from "../../utils/activeKey";
import { adminPaths } from "../../Routes/admin.route";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import Sider from "antd/es/layout/Sider";
import { AllImages } from "../../../public/images/AllImages";

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

  const activeKeys = getActiveKeys(normalizedPath);
  const menuItems =
    userRole?.role === "admin"
      ? //   ? sidebarItemsGenerator(adminPaths, "admin")
        sidebarItemsGenerator(adminPaths, userRole?.role, location)
      : [];

  menuItems.push({
    key: "logout",
    icon: (
      <img
        src={logout}
        alt="logout"
        width={16}
        height={16}
        style={{ color: "#222222", fontSize: "16px", marginRight: "5px" }}
      />
    ),
    label: (
      <div onClick={() => localStorage.removeItem("home_care_user")}>
        <NavLink to="/signin">Logout</NavLink>
      </div>
    ),
  });

  return (
    <div className="h-screen bg-ribg-primary-color ">
      <ScrollRestoration />

      <Layout className="flex !bg-primary-color">
        <Sider
          theme="light"
          width={280}
          trigger={null}
          breakpoint="lg"
          collapsedWidth="0"
          collapsible
          collapsed={collapsed}
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
            backgroundColor: "#6A0DAD",
          }}
          className=""
        >
          <Link to="/">
            <img
              src={AllImages.logo}
              alt="logo"
              sizes="100vw"
              className="w-auto h-20 my-10 mx-auto"
            />
          </Link>

          <Menu
            mode="inline"
            defaultSelectedKeys={activeKeys}
            selectedKeys={activeKeys}
            style={{
              backgroundColor: "transparent",
              border: "none",
              paddingLeft: "6px",
              paddingRight: "6px",
            }}
            items={menuItems}
          />
        </Sider>
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
      </Layout>
    </div>
  );
};
export default DashboardLayout;
