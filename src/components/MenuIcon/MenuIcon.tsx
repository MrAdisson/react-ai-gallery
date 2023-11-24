import { ReactElement } from "react";

import "./MenuIcon.css";

const MenuIcon = ({ children }: { children: ReactElement }) => {
  return <div className="menuIcon">{children}</div>;
};

export default MenuIcon;
