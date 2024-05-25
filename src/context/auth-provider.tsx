import { PropsWithChildren, createContext, useState } from "react";

export interface AuthObject {
  email: string;
  accessToken: string;
}

export type AuthContextType = {
  auth: AuthObject | null;
  setAuth: (auth: AuthObject) => void;
};

export type AuthProviderProps = PropsWithChildren;

export const AuthContext = createContext<AuthContextType>({
  auth: null,
  setAuth: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthObject | null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
