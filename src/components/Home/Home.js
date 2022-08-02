import classes from "./Home.module.css";
import Thumbnail from "./Thumbnail/Thumbnail";
import ContactBar from "../Footer/ContactBar";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import AuthContext from "../context/authContext";
import { useContext } from "react";

const Home = (props) => {
  const location = useLocation()
  let from = null
  if(location.state) {
    from = location.state.from
  }
  const auth = useContext(AuthContext)


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
        {props.projects.map((project) => (
          <Thumbnail key={project.id} {...project} />
        ))}
       {auth.isAuthenticated === true ? <Thumbnail /> : null}
      </div>

      
      <ContactBar />
    </motion.section>
  );
};

export default Home;
