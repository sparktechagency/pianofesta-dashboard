/* eslint-disable no-unused-vars */
//* ------------------ICONS------------------
import dashboardLogo from "/images/dashboard-logo/dashboard.svg";
import users from "/images/dashboard-logo/users.svg";
import category from "/images/dashboard-logo/category.svg";
import earning from "/images/dashboard-logo/earning.svg";
import inspiration from "/images/dashboard-logo/Inspiration.svg";
import community from "/images/dashboard-logo/community.svg";
import sponsor from "/images/dashboard-logo/sponsor.svg";
import support from "/images/dashboard-logo/support.svg";
import messageAndCom from "/images/dashboard-logo/messageAndCom.svg";
import searchHistory from "/images/dashboard-logo/searchHistory.svg";
import promotion from "/images/dashboard-logo/promotion.svg";
// import organizers from "/images/dashboard-logo/organizers.svg";
// import subscription from "/images/dashboard-logo/subscription.svg";
// import withdrawals from "/images/dashboard-logo/withdrawals.svg";
// import suggestion from "/images/dashboard-logo/suggestion.svg";
// import feedback from "/images/dashboard-logo/feedback.svg";
// import supportRequests from "/images/dashboard-logo/supportRequests.svg";

import setting from "/images/dashboard-logo/setting.svg";

//* ------------------IMPORT COMPONENTS------------------
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import AdminAllUsers from "../Pages/Admin/AdminUserManagement/AdminAllUsers";
import AdminBusinessUser from "../Pages/Admin/AdminUserManagement/AdminBusinessUser";

import Profile from "../Pages/Common/settings/Profile";
import PrivacyPolicy from "../Pages/Common/settings/PrivacyPolicy";
import TermsOfService from "../Pages/Common/settings/TermsOfService";
import AdminCategory from "../Pages/Admin/AdminCategory";
import AdminEarning from "../Pages/Admin/AdminEarning";
import AdminInspiration from "../Pages/Admin/AdminInspiration";
import AdminCommunity from "../Pages/Admin/AdminCommunity";
import FAQSection from "../Pages/Common/settings/FAQ";
import AdminSponsorManagement from "../Pages/Admin/AdminSponsor";
import AdminMessageAndComment from "../Pages/Admin/AdminMessageAndComment";
import SearchHistory from "../Pages/Admin/SearchHistory";
import AdminPromotion from "../Pages/Admin/AdminPromotion";

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
    icon: users,
    children: [
      {
        key: "regular",
        path: "regular",
        element: <AdminAllUsers />,
        name: "Regular",
      },
      {
        key: "business",
        path: "business",
        element: <AdminBusinessUser />,
        name: "Business",
      },
    ],
  },
  {
    path: "category",
    element: <AdminCategory />,
    key: "category",
    name: "Category",
    icon: category,
  },
  {
    path: "earning",
    element: <AdminEarning />,
    key: "earning",
    name: "Earning",
    icon: earning,
  },
  {
    path: "inspiration",
    element: <AdminInspiration />,
    key: "inspiration",
    name: "Inspiration",
    icon: inspiration,
  },
  {
    path: "community",
    element: <AdminCommunity />,
    key: "community",
    name: "Community",
    icon: community,
  },
  {
    path: "sponsor",
    element: <AdminSponsorManagement />,
    key: "sponsor",
    name: "Sponsor Management",
    icon: sponsor,
  },
  {
    path: "message-comment",
    element: <AdminMessageAndComment />,
    key: "message-comment",
    name: "Message & Comment",
    icon: messageAndCom,
  },
  {
    path: "search-history",
    element: <SearchHistory />,
    key: "search-history",
    name: "Search History",
    icon: searchHistory,
  },
  {
    path: "promotions",
    element: <AdminPromotion />,
    key: "promotions",
    name: "Promotions",
    icon: promotion,
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
      {
        key: "faq",
        path: "faq",
        element: <FAQSection />,
        name: "FAQ",
      },
    ],
  },
];
