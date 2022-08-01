import classes from "./AddProject.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext} from "react";
import AuthContext from "../../context/authContext";

const AddProject = () => {
    // const [type, setType] = useState("")
    // const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const auth = useContext(AuthContext)

    const [project, setProject] = useState({
        type: "",
        name: "",
        description: "",
        pictures: [],
    })

    const submitHandler = (e) => {
        e.preventDefault()

        console.log(project)
        // navigate("/")

    }
    if (auth.isAuthenticated === false) {
        navigate("/")
    } else {

        return (
          <AnimatePresence>
            <motion.section
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: .2 }}
              className={classes.loginContainer}
            >
              <h4 className={classes.headerText}>Add Project</h4>
              <form onSubmit={submitHandler}>
                  <label htmlFor="type">Type</label>
                  <input type="text" id="type" value={project.type} onChange={e => setProject({...project, type: e.target.value })} className={classes.input}></input>
                  <label htmlFor="name">Project's Name</label>
      
                  <input type="text" id="name" value={project.name} onChange={e => setProject({...project, name: e.target.value })} className={classes.input}></input>
                  <button type="submit" className={classes.button}>Add Project</button>
              </form>

             
            </motion.section>
          </AnimatePresence>
        );
    }
};

export default AddProject;
