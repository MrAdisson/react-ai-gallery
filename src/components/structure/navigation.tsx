import Home from "@/components/pages/Home";
import About from "@/components/pages/About";
import Login from "@/components/pages/Login";
import Profile from "@/components/pages/Profile";

export type RouteType = {
  path: string;
  name: string;
  element: JSX.Element;
  isMenu: boolean;
  isPrivate: boolean;
};

export const nav = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
    isMenu: true,
    isPrivate: false,
  },
  {
    path: "/about",
    name: "About",
    element: <About />,
    isMenu: true,
    isPrivate: false,
  },
  {
    path: "/login",
    name: "Login",
    element: <Login />,
    isMenu: false,
    isPrivate: false,
  },
  {
    path: "/profile",
    name: "profile",
    element: <Profile />,
    isMenu: true,
    isPrivate: true,
  },
] as RouteType[];
