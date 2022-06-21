import { gql, useLazyQuery } from "@apollo/client";
import * as React from "react";
import { Navigate } from "react-router-dom";

type LoggedUser = null | {
  username: string;
  role: string;
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
const LOGINQUERY = gql`
  query userLogin($username: String!, $password: String!) {
    checkUser(username: $username, password: $password) {
      authentication
      role
    }
  }
`;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<LoggedUser>(null);
  const [login] = useLazyQuery(LOGINQUERY);

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
          onSuccess();
        } else {
          onFail();
        }
      })
      .catch(() => onError());
  };

  let signout = (callback: VoidFunction) => {
    setUser(null);
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
