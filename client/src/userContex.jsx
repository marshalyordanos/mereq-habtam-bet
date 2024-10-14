import React, { useContext, useState } from "react";

const UserContext = React.createContext();
const UserloginContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export function useUserLogin() {
  return useContext(UserloginContext);
}

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ id: "0987" });
  const login = (user) => {
    setUser(user);
  };
  return (
    <UserContext.Provider value={user}>
      <UserloginContext.Provider value={login}>
        {children}
      </UserloginContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;
