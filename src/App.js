import React, {useEffect, useState } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Project from "./components/pages/Project/Project";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Photos from "./components/pages/Photos/Photos";
import About from "./components/pages/About/About";
import Contact from "./components/Contact/Contact"
import Login from "./components/pages/Login/Login";
import AuthContext from "./components/context/authContext";
import DataContext from "./components/context/dataContext";
import AddProject from "./components/pages/AddProject/AddProject";
import axios from "axios";
import EditProjects from "./components/pages/EditProjects/EditProjects";

function App() {
  // const [loading, setLoading] = useState(false)
  const [userLogged, setUserLogged ] = useState(false)
  const [data,setData] = useState([])

  const [showContact, setShowContact] = useState(null)
  const onContactHandler =()=> {
    setShowContact(true)
  }
  const hideContact = ()=> {
    setShowContact(null)
  }

  const DB_PATH = process.env.REACT_APP_DB_PATH

  useEffect(()=>{
    fetchData()
  },[])

  const fetchData = async () => {
    // setLoading(true)

    try {
      const res = await axios.get(`${DB_PATH}/projects.json`)
      const newProject = []
      for (const key in res.data) {
        newProject.push({...res.data[key], id: key})
      }
      setData(newProject.reverse())
      // setLoading(false)
      console.log(data)

    } catch (ex) {
      console.log(ex.response)
    }
  }
  

  const navbar = <Navbar onContact={onContactHandler}/>;
  const content = (
    <Routes>
      <Route path="/" element={(
                  <>
                  {navbar} <Home />
                  </>
      )} />

      <Route path=":title/photos" element={
                  <Photos />
      } />

      <Route path=":title" element={(<>
                  {navbar}
                  <Project />
                  </>
      )} />

      <Route path="about" element={(<>
                  {navbar}
                  <About />
                  </>      )} />


      <Route path="login" element={(<>
                  {navbar}
                  <Login />
                  </>
      )} />

      <Route path="addproject" element={(<>
                  {navbar}
                  <AddProject />
                  </>

      
      )} />

      <Route path="editprojects" element={(<>
                  {navbar}
                  <EditProjects />
                  </>
      )} />

    </Routes>
  );
  const contact = <Contact onHideContact={hideContact} />
  const footer = <Footer />;

  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          isAuthenticated: userLogged,
          login: ()=>{setUserLogged(true)},
          logout: ()=>{setUserLogged(false)}
        }}>
        <DataContext.Provider
          value={{
            projects: data,
            setProjects: (data)=>{setData(data)},
            fetchProjects: ()=>{fetchData()}}
          }>
            <Layout 
            content={content} 
            contact={showContact !== null ? contact : null}
            footer={footer} />
        </DataContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
