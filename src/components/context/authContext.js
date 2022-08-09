import React from "react";
const AuthContext = React.createContext({
  isAuthenticated: false,
  userId: "",
  login: () => {},
  logout: () => {},
});

AuthContext.displayName = "AuthContext";
export default AuthContext;
