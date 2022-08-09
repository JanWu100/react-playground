import classes from "./EditProjects.module.css"
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";
import ProjectBar from "./ProjectBar/ProjectBar";
import DataContext from "../../context/dataContext";
// import { getDatabase, ref, onValue, remove} from "firebase/database";
import {ref as ref_storage, deleteObject } from "firebase/storage";
import {storage } from "../../../firebase"
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const EditProjects = () => {

    const navigate = useNavigate();
    const [auth] = useAuth()
    const authContext = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const dataContext = useContext(DataContext)
    const userData = dataContext.projects.filter((x) => x.createdBy === authContext.user.userId)


    const onDeleteHandler = async (id,pictures) => {
        setLoading(true)
        await deleteProject(id)
        await deletePicturesFromStorage(pictures)
        setLoading(false)
    }

    const deleteProject = async (id)=> {
        // const db = getDatabase();
        // const itemToDelete = ref(db, `projects/${authContext.user.userId}` + id);
        // await remove(itemToDelete)
        const DB_PATH = process.env.REACT_APP_DB_PATH
        await axios.delete(`${DB_PATH}/projects/${authContext.user.userId}/${id}.json?auth=${authContext.user.token}`)
        dataContext.fetchProjects()
    }

    const deletePicturesFromStorage = async (pictures) => {
        pictures.forEach(picture => {
            const fileName = picture[1]
            const imageRef = ref_storage(storage, `images/${fileName}`);
            deleteObject(imageRef)
        })
    }

    if (!auth) {
      navigate("/")
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
                {userData.map((project) => (
                <ProjectBar key={project.id} {...project} onDelete={onDeleteHandler} loading={loading}/>
                ))}
            </div>
          </motion.section>
        </AnimatePresence>
      );  
}

export default EditProjects