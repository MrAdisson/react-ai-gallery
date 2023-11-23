import Home from "@/components/pages/Home";
import About from "@/components/pages/About";
import Login from "@/components/pages/Login";
import Profile from "@/components/pages/Profile";

import { ReactElement } from "react";

// ICONS

import { IoHomeOutline } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoPersonCircleOutline } from "react-icons/io5";
import ImageDetail from "../pages/ImageDetail";

export type RouteType = {
  path: string;
  name: string;
  element: JSX.Element;
  isMenu: boolean;
  isPrivate: boolean;
  icon?: ReactElement;
};

export const navigationIconStyle = {
  fontSize: "2rem",
};

export const nav = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
    isMenu: true,
    isPrivate: false,
    icon: <IoHomeOutline style={navigationIconStyle} className="navIcon" />,
  },
  {
    path: "/about",
    name: "About",
    element: <About />,
    isMenu: true,
    isPrivate: false,
    icon: (
      <IoInformationCircleOutline
        style={navigationIconStyle}
        className="navIcon"
      />
    ),
  },
  {
    path: "/profile",
    name: "profile",
    element: <Profile />,
    isMenu: true,
    isPrivate: true,
    icon: (
      <IoPersonCircleOutline style={navigationIconStyle} className="navIcon" />
    ),
  },
  {
    path: "/login",
    name: "Login",
    element: <Login />,
    isMenu: false,
    isPrivate: false,
  },
  {
    path: "/image/:id",
    name: "Image",
    element: <ImageDetail />,
    isMenu: false,
    isPrivate: false,
  },
] as RouteType[];
