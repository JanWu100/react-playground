import React, {useEffect, useState, useContext } from "react";
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
import Register from "./components/pages/Register/Register";

function App() {
  const [userLogged, setUserLogged ] = useState(false)
  const [data,setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

  const [showContact, setShowContact] = useState(null)

  const authContext = useContext(AuthContext)


  const onContactHandler =()=> {
    setShowContact(true)
  }
  const hideContact = ()=> {
    setShowContact(null)
  }

  const DB_PATH = process.env.REACT_APP_DB_PATH

  useEffect(()=>{
    fetchData()
  },[user])

  const fetchData = async () => {
    setLoading(true)

    try {
      const main = await axios.get(`${DB_PATH}/projects/GmPva0Bj4YYOSgEL70XBQzO43Fq2.json`)
      const res = await axios.get(`${DB_PATH}/projects/${user && user.userId !== "GmPva0Bj4YYOSgEL70XBQzO43Fq2" ? user.userId : null}.json`)
      const newProject = []
      for (const key in main.data) {
        newProject.push({...main.data[key], id: key})
      }
      for (const key in res.data) {
        newProject.push({...res.data[key], id: key})
      }
      setData(newProject.reverse())
      setLoading(false)

    } catch (ex) {
      console.log(ex.response)
    }
  }

  const loader = (
      <div className="spinnerContainer">
          <span
            className={`spinner-border spinner`}
            role="status"
            aria-hidden="true"
          ></span>
      </div>
    )
  
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
      
      <Route path="register" element={(<>
                  {navbar}
                  <Register />
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
          user: user,
          login: (user)=>{setUserLogged(true)
                        setUser(user)},
          logout: ()=>{setUserLogged(false)
                        setUser(null)}
        }}>
        <DataContext.Provider
          value={{
            projects: data,
            setProjects: (data)=>{setData(data)},
            fetchProjects: ()=>{fetchData()}}
          }>
            <Layout 
            navbar={loading ? navbar : null}
            content={loading ? loader : content} 
            contact={showContact !== null ? contact : null}
            footer={footer} />
        </DataContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}


export default App;
