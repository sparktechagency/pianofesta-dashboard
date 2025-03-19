import { NavLink } from "react-router-dom";

export const sidebarItemsGenerator = (items, role) => {
  const sidebarItems = items.reduce((acc, item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.key,
        icon: item.icon ? (
          <img
            src={item.icon}
            alt="users"
            width={20}
            style={{
              marginRight: "5px",
              filter: location.pathname.includes(item.path)
                ? "sepia(1) hue-rotate(275deg) saturate(86000000000%) brightness(45%) "
                : undefined,
            }}
          />
        ) : null,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.children && item.children.length > 0) {
      acc.push({
        key: item.key,
        icon: item.icon ? (
          <img
            src={item.icon}
            alt="users"
            width={20}
            style={{
              marginRight: "5px",
              filter: location.pathname.includes(item.path)
                ? "sepia(1) hue-rotate(275deg) saturate(86000000000%) brightness(45%) "
                : undefined,
            }}
          />
        ) : null,
        label: <span className="text-primary-color">{item.name}</span>,
        children: item.children
          .filter((child) => child.name) // Ensure child has a name
          .map((child) => ({
            key: child.key,
            label: (
              <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
            ),
          })),
      });
    }

    return acc;
  }, []);

  return sidebarItems;
};
