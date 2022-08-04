import classes from "./Home.module.css";
import Thumbnail from "./Thumbnail/Thumbnail";
import ContactBar from "../Footer/ContactBar";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import AuthContext from "../context/authContext";
import { useContext, useState, useEffect} from "react";
import axios from "axios";
import DataContext from "../context/dataContext";


const Home = (props) => {
  const location = useLocation()
  let from = null
  if(location.state) {
    from = location.state.from
  }

  const [loading, setLoading] = useState(false)

  const auth = useContext(AuthContext)
  const dataContext = useContext(DataContext)

  if(loading) {
    return (
      <div className={classes.spinnerContainer}>
              <span
      className={`spinner-border me-3 ${classes.spinner}`}
      role="status"
      aria-hidden="true"
    ></span>
      </div>

    )
  }

  return (
    <motion.section
      initial={from ? { x: -300, opacity: 0 } : { x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: .2 }}
      className={classes.homeContainer}
    >
      <h1 className={classes.lead}>
        Architecture studio based in Poznan, Poland. Architecture, interiors,
        design.
      </h1>
      <div className={classes.projects}>
        {dataContext.projects.map((project) => (
          <Thumbnail key={project.id} {...project} />
        ))}
       {auth.isAuthenticated === true ? <Thumbnail /> : null}
      </div>

      
      <ContactBar />
    </motion.section>
  );
};

export default Home;
