import { useQuery } from "@apollo/client";
import { createContext, useContext } from "react";
import { USER } from "../schemas/queries/user";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const { data, error, loading, refetch } = useQuery(USER);
  const isAuth = !!data && !!data.user;
  return (
    <UserContext.Provider
      value={{ isAuth, user: data?.user ?? null, loading, refetch }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
