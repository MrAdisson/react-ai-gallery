import { Link, Route, Routes } from "react-router-dom";
import { AuthData } from "../../auth/AuthWrapper";
import { RouteType, nav, navigationIconStyle } from "./navigation";
import { IoLogInOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";

export const RenderRoutes = () => {
  const { user } = AuthData();
  return (
    <Routes>
      {nav.map((r, i) => {
        if (r.isPrivate && user.isAuthenticated) {
          return <Route key={i} path={r.path} element={r.element} />;
        } else if (!r.isPrivate) {
          return <Route key={i} path={r.path} element={r.element} />;
        } else return false;
      })}
      <Route path="*" element={<h1>404 404 404 404</h1>} />
    </Routes>
  );
};

export const RenderMenu = () => {
  const { user, logout } = AuthData();
  const MenuItem = ({ r }: { r: RouteType }) => {
    return (
      <div className="menuItem">
        <div>
          <Link to={r.path}>{r.icon}</Link>
        </div>
      </div>
    );
  };
  return (
    <div className="menu">
      {nav.map((r, i) => {
        if (!r.isPrivate && r.isMenu) {
          return <MenuItem key={i} r={r} />;
        } else if (user.isAuthenticated && r.isMenu) {
          return <MenuItem key={i} r={r} />;
        } else return false;
      })}

      {user.isAuthenticated ? (
        <div className="menuItem">
          <Link to={"#"} onClick={logout}>
            <IoLogOutOutline style={navigationIconStyle} className="navIcon" />
          </Link>
        </div>
      ) : (
        <div className="menuItem">
          <Link to={"login"}>
            <IoLogInOutline style={navigationIconStyle} className="navIcon" />
          </Link>
        </div>
      )}
    </div>
  );
};
