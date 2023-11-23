import { createContext, useContext, useEffect, useState } from "react";
import { RenderHeader } from "../components/structure/Header";
import { RenderRoutes } from "../components/structure/RenderNavigation";
import { jwtDecode } from "jwt-decode";
import feathersClient from "@/configs/feathers";

export type User = {
  email: string;
  isAuthenticated: boolean;
};

export type ContextType = {
  user: User;
  login: (email: string, password: string) => void;
  logout: () => void;
};

// CREATE AUTH CONTEXT AND DEFAULT VALUE
const AuthContext = createContext<ContextType>({
  user: { email: "", isAuthenticated: false },
  login: () => {},
  logout: () => {},
});

export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  const [user, setUser] = useState<User>({ email: "", isAuthenticated: false });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      (async () => {
        try {
          const decodedToken = jwtDecode(accessToken);
          if ((decodedToken.exp || 0) * 1000 < Date.now()) {
            setUser({ email: "", isAuthenticated: false });
          } else {
            const data = await feathersClient.service("authentication").create({
              strategy: "jwt",
              accessToken,
            });
            console.log(data);
            setUser({ email: data.user.email, isAuthenticated: true });
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);

  const login = async (email: string, password: string) => {
    console.log("email", email);
    console.log("password", password);

    const data = await feathersClient.service("authentication").create({
      strategy: "local",
      email,
      password,
    });
    console.log("data", data);
    localStorage.setItem("accessToken", data.accessToken);
    setUser({ email, isAuthenticated: true });
  };

  const logout = () => {
    if (!user) return;
    localStorage.removeItem("accessToken");
    setUser({ ...user, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <>
        <RenderHeader />
        {/* MENU IS IN HEADER, uncomment to get independant menu */}
        {/* <RenderMenu /> */}
        <RenderRoutes />
      </>
    </AuthContext.Provider>
  );
};
