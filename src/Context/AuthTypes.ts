import { ReactNode } from "react";

export interface AuthTypes {
  username: string;
  _id: string;
  pwd: string;
  roles: number[];
  accessToken: string;
}

export interface AuthContextType {
  auth: AuthTypes;
  setAuth: React.Dispatch<React.SetStateAction<AuthTypes>>;
}
export interface AuthProviderProps {
  children: ReactNode;
}
