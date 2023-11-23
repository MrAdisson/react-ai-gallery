// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AuthWrapper } from "@/auth/AuthWrapper";

import "./index.css";

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);

root.render(
  // <StrictMode>
  <BrowserRouter>
    <AuthWrapper />
  </BrowserRouter>
  // </StrictMode>
);
