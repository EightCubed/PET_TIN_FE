import React, { createContext, useState, ReactNode, useContext } from "react";

interface AuthTypes {
  username: string;
  pwd: string;
  roles: number[];
  accessToken: string;
}

const initAuth: AuthTypes = {
  username: "",
  pwd: "",
  roles: [],
  accessToken: "",
};

interface AuthContextType {
  auth: AuthTypes;
  setAuth: React.Dispatch<React.SetStateAction<AuthTypes>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthTypes>(initAuth);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
