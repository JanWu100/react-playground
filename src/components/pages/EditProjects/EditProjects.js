import classes from "./EditProjects.module.css"
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";
import ProjectBar from "./ProjectBar/ProjectBar";
import DataContext from "../../context/dataContext";
import { getDatabase, ref, onValue, remove} from "firebase/database";

const EditProjects = () => {

    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [loading, setLoading] = useState(false)

    const dataContext = useContext(DataContext)

    useEffect(() => {
        if (auth.isAuthenticated === false) {
          navigate("/");
        }
      }, [auth.isAuthenticated, navigate]);

    const deleteProject = async (id)=> {
        setLoading(true)
        const db = getDatabase();

        const itemToDelete = ref(db, 'projects/' + id);
        await remove(itemToDelete)
        dataContext.fetchProjects()
        setLoading(false)
    }

    return (
        <AnimatePresence>
          <motion.section
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: .2 }}
            className={classes.loginContainer}
          >
            <h4 className={classes.headerText}>Edit Projects</h4>

            <div className={classes.container}>
            {dataContext.projects.map((project) => (
             <ProjectBar key={project.id} {...project} onDelete={deleteProject} loading={loading}/>
        ))}

            </div>
   
           
          </motion.section>
        </AnimatePresence>
      );
    
}

export default EditProjects