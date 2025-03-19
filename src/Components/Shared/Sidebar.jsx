import Sider from "antd/es/layout/Sider";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AllImages } from "../../../public/images/AllImages";
import { Menu } from "antd";
import getActiveKeys from "../../utils/activeKey";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../Routes/admin.route";
import logout from "/images/dashboard-logo/logout.svg";

const Sidebar = ({ normalizedPath, collapsed, userRole }) => {
  const activeKeys = getActiveKeys(normalizedPath);
  const location = useLocation();
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
          width={1000}
          height={1000}
          sizes="100vw"
          className="w-[80%] my-12 mx-auto"
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
  );
};

export default Sidebar;
