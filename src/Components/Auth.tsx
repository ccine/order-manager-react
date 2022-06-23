import { useLazyQuery } from "@apollo/client";
import * as React from "react";
import { Navigate } from "react-router-dom";
import { CHECK_USER } from "../Graphql/query";
import { Role } from "../types";

type LoggedUser = null | {
  username: string;
  role: Role;
};

interface AuthContextType {
  user: LoggedUser;
  signin: (
    username: string,
    password: string,
    onSuccess: VoidFunction,
    onFail: VoidFunction,
    onError: VoidFunction
  ) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let savedUserNull = localStorage.getItem("user");
  let savedUser = savedUserNull ? JSON.parse(savedUserNull) : null;
  let [user, setUser] = React.useState<LoggedUser>(savedUser);
  const [login] = useLazyQuery(CHECK_USER);

  let signin = (
    username: string,
    password: string,
    onSuccess: VoidFunction,
    onFail: VoidFunction,
    onError: VoidFunction
  ) => {
    return login({
      variables: {
        username: username,
        password: password,
      },
    })
      .then((res) => {
        if (!res || !res.data || res.error) {
          onError();
          return;
        }
        if (res.data.checkUser.authentication) {
          setUser({
            username: username,
            role: res.data.checkUser.role,
          });
          localStorage.setItem(
            "user",
            JSON.stringify({
              username: username,
              role: res.data.checkUser.role,
            })
          );
          onSuccess();
        } else {
          onFail();
        }
      })
      .catch(() => onError());
  };

  let signout = (callback: VoidFunction) => {
    setUser(null);
    localStorage.removeItem("user");
    callback();
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
