import React from "react";
const DataContext = React.createContext({
  projects: [],
  setProjects: ()=>{},
  fetchProjects: ()=>{}
});

DataContext.displayName = "DataContext";
export default DataContext;
