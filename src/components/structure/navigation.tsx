import Home from "@/components/pages/Home";
import Upload from "@/components/pages/Upload";
import Login from "@/components/pages/Login";
import Profile from "@/components/pages/Profile";

import { ReactElement } from "react";

import { IoCloudUploadOutline, IoHomeOutline } from "react-icons/io5";
import { IoPersonCircleOutline } from "react-icons/io5";
import ImageDetail from "../pages/ImageDetail";
import MenuIcon from "../MenuIcon/MenuIcon";

export type RouteType = {
  path: string;
  name: string;
  element: JSX.Element;
  isMenu: boolean;
  isPrivate: boolean;
  icon?: ReactElement;
};

export const nav = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
    isMenu: true,
    isPrivate: false,
    icon: (
      <MenuIcon>
        <IoHomeOutline />
      </MenuIcon>
    ),
  },
  {
    path: "/upload",
    name: "Upload",
    element: <Upload />,
    isMenu: true,
    isPrivate: true,
    icon: (
      <MenuIcon>
        <IoCloudUploadOutline />
      </MenuIcon>
    ),
  },
  {
    path: "/profile",
    name: "profile",
    element: <Profile />,
    isMenu: true,
    isPrivate: true,
    icon: (
      <MenuIcon>
        <IoPersonCircleOutline />
      </MenuIcon>
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
