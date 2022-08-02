import React, {useEffect, useState } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Project from "./components/Project/Project";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Photos from "./components/Photos/Photos";
import About from "./components/pages/About/About";
import Contact from "./components/Contact/Contact"
import Login from "./components/pages/Login/Login";
import AuthContext from "./components/context/authContext";
import AddProject from "./components/pages/AddProject/AddProject";
import axios from "axios";

function App() {
  const [projects, setProjects] = useState([])
  const DB_PATH = process.env.REACT_APP_DB_PATH

  useEffect(()=>{
    fetchData()
  },[projects])

  const fetchData = async () => {
    try {
      const res = await axios.get(`${DB_PATH}/projects.json`)
      const newProject = []
      for (const key in res.data) {
        newProject.push({...res.data[key], id: key})
      }
      setProjects(newProject.reverse())

    } catch (ex) {
      console.log(ex.response)
    }
  }

  const [userLogged, setUserLogged ] = useState(false)

  const [showContact, setShowContact] = useState(null)
  const onContactHandler =()=> {
    setShowContact(true)
  }
  const hideContact = ()=> {
    setShowContact(null)
  }
  

  const navbar = <Navbar onContact={onContactHandler}/>;
  const content = (
    <Routes>
      <Route path="/" element={(
                  <>
                  {navbar} <Home projects={projects} />
                  </>
      )} />

      <Route path=":type/:id/photos" element={
                  <Photos projects={projects}/>
      } />

      <Route path=":type/:id" element={(<>
                  {navbar}
                  <Project projects={projects} />
                  </>
      )} />

        <Route path="about" element={(<>
                  {navbar}
                  <About />
                  </>
      )} />

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
        <Layout 
        content={content} 
        contact={showContact !== null ? contact : null}
        footer={footer} />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
