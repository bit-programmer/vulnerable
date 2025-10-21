import * as React from "react";
import { type AuthType } from "./types";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

export const AuthContext = React.createContext<AuthType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  const [username, setUserName] = React.useState<string | null>(null);
  const [token, setToken] = React.useState<string | null>(null);

  const signin = async (username: string, password: string): Promise<void> => {
    const response = await axios.post(
      `${BACKEND_URL}/login`,
      {
        username: username,
        password: password,
      }
    );
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard", { replace: true });
    } else {
      throw new Error("Unable to login :(");
    }
  };

  const signout = () => {
    localStorage.removeItem("token");
    setUserName(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ username, token, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
