/* eslint-disable no-unused-vars */
//* ------------------ICONS------------------
import dashboardLogo from "/images/dashboard-logo/dashboard.svg";
import users from "/images/dashboard-logo/users.svg";
// import organizers from "/images/dashboard-logo/organizers.svg";
// import earning from "/images/dashboard-logo/earning.svg";
// import subscription from "/images/dashboard-logo/subscription.svg";
// import withdrawals from "/images/dashboard-logo/withdrawals.svg";
// import suggestion from "/images/dashboard-logo/suggestion.svg";
// import feedback from "/images/dashboard-logo/feedback.svg";
// import supportRequests from "/images/dashboard-logo/supportRequests.svg";

import setting from "/images/dashboard-logo/setting.svg";

//* ------------------IMPORT COMPONENTS------------------
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import AdminAllUsers from "../Pages/Admin/AdminAllUsers";
import Profile from "../Pages/Common/settings/Profile";
import PrivacyPolicy from "../Pages/Common/settings/PrivacyPolicy";
import TermsOfService from "../Pages/Common/settings/TermsOfService";

export const adminPaths = [
  {
    path: "dashboard",
    element: <AdminDashboard />,
    key: "dashboard",
    name: "Dashboard",
    icon: dashboardLogo,
  },
  {
    name: "User Management",
    icon: setting,
    children: [
      {
        key: "regular",
        path: "regular",
        element: <AdminAllUsers />,
        name: "Regular",
      },
    ],
  },
  {
    name: "Setting",
    icon: setting,
    children: [
      {
        key: "profile",
        path: "profile",
        element: <Profile />,
        name: "Profile",
      },
      {
        key: "privacy-policy",
        path: "privacy-policy",
        element: <PrivacyPolicy />,
        name: "Privacy Policy",
      },
      {
        key: "terms-of-service",
        path: "terms-of-service",
        element: <TermsOfService />,
        name: "Terms of Service",
      },
    ],
  },
];
