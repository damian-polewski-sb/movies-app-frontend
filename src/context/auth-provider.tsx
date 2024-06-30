import { PropsWithChildren, createContext, useState } from "react";

export interface UserDataObject {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
}
export interface AuthObject {
  accessToken: string;
}

export type AuthContextType = {
  auth: AuthObject | null;
  setAuth: (auth: AuthObject | null) => void;
  userData: UserDataObject | null;
  setUserData: (userData: UserDataObject | null) => void;
};

export type AuthProviderProps = PropsWithChildren;

export const AuthContext = createContext<AuthContextType>({
  auth: null,
  setAuth: () => {},
  userData: null,
  setUserData: () => {}
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthObject | null>(null);
  const [userData, setUserData] = useState<UserDataObject | null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
