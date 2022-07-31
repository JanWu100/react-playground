import React, { useState } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Project from "./components/Project/Project";
import DUMMY_DATA from "./assets/data.json";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Photos from "./components/Photos/Photos";
import About from "./components/pages/About";
import Contact from "./components/Contact/Contact"
import Login from "./components/pages/Login";
import AuthContext from "./components/context/authContext";

function App() {
  const projects = DUMMY_DATA.projects;

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


    </Routes>
  );
  const contact = <Contact onHideContact={hideContact} />
  const footer = <Footer />;

  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          isAuthenticated: false,
          login: ()=>{},
          logout: ()=>{}
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
