import React from "react";
const UserContext = React.createContext({
  user: {}
});

UserContext.displayName = "UserContext";
export default UserContext;
