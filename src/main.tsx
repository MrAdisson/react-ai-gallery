// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AuthWrapper } from "@/auth/AuthWrapper";
import "@fontsource/roboto"; // Defaults to weight 400

import "@fontsource/roboto/400.css"; // Specify weight
import "@fontsource/roboto/100.css"; // Specify weight and style
import "@fontsource/roboto/100-italic.css"; // Specify weight and style
import "@fontsource/roboto/300.css"; // Specify weight and style
import "@fontsource/roboto/500.css"; //
import "@fontsource/roboto/700.css"; //
import "@fontsource/roboto/900.css"; //
import "@fontsource/roboto/400-italic.css"; // Specify weight and style
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import { ToastContainer } from "react-toastify";

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);

root.render(
  // <StrictMode>
  <BrowserRouter>
    <AuthWrapper />
    <ToastContainer />
  </BrowserRouter>
  // </StrictMode>
);
