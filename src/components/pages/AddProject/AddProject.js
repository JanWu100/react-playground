import React from 'react'
import classes from "./AddProject.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/authContext";
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { v4 } from "uuid"
import axios from 'axios';


const AddProject = () => {

  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [project, setProject] = useState({
    type: "Project",
    title: "",
    description: "Sed senectus quam tempor pharetra tincidunt. Urna, venenatis netus lacus, odio. Turpis lorem quis ut in. Tincidunt aliquam vitae, fermentum quis nibh dignissim. Commodo amet phasellus urna cursus fermentum. Id purus quam viverra tempus nec bibendum amet. Natoque neque eget platea in tempus. Nunc rhoncus aliquet pellentesque quis vitae ornare justo hac. Gravida integer eget purus risus eget. Quisque pellentesque proin vestibulum commodo.",
    big: [],
    thumbnail: null
  });

  const options = [
    { value: "Project", label: "Project" },
    { value: "Award", label: "Award" },
    { value: "Article", label: "Article" },
  ];

  const submitHandler = async (e) => {
    e.preventDefault();
    if(project.title.length === 0) {
        console.log("Project needs a title")
    } else if (project.description.length === 0) {
        console.log("Project needs a description")
    } else if (project.big.length === 0) {
        console.log("Project needs some pictures")
    } else {
        // console.log(project)
        const DB_PATH = process.env.REACT_APP_DB_PATH
        await axios.post(`${DB_PATH}/projects.json`, project)
        navigate("/")

    }
        
  };

  useEffect(() => {
    if (auth.isAuthenticated === false) {
      navigate("/");
    }
  }, [auth.isAuthenticated,navigate]);


const [imageUpload, setImageUpload] = useState(null)
const [imageList, setImageList] = useState([])

const fileInputHandler = async (e) => {
    if(e.target.files[0].size > 2097152/2) {
        alert("file to big (maximum allowed size = 2mb")
    } else {
        setImageUpload(e.target.files[0])
    }

}
useEffect(()=>{
    uploadImage()
},[imageUpload])

useEffect(()=>{
    if(imageList) {
       setProject({...project, big: imageList, thumbnail: imageList[0]})
    }
  },[imageList])


const uploadImage = ()=> {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
    uploadBytes(imageRef, imageUpload).then((snapshot)=>{
        getDownloadURL(snapshot.ref).then((url)=>{
            setImageList((prev) => [...prev, url])
        })
    })
}

  return (
    <AnimatePresence>
      <motion.section
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={classes.loginContainer}
      >
        <h4 className={classes.headerText}>Add Project</h4>
        <form onSubmit={submitHandler}>
          {/* <label htmlFor="type">Type</label>
          <input
            type="text"
            id="type"
            value={project.type}
            onChange={(e) => setProject({ ...project, type: e.target.value })}
            className={classes.input}
          ></input> */}

          <label htmlFor="type">Type</label>
          <select
            value={project.type}
            onChange={(e) => setProject({ ...project, type: e.target.value })}
            className={classes.select}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label htmlFor="name">Project's Name</label>
          <input
            type="text"
            id="name"
            value={project.title}
            onChange={(e) => setProject({ ...project, title: e.target.value })}
            className={classes.input}
          ></input>

          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            id="description"
            value={project.description}
            onChange={(e) =>
              setProject({ ...project, description: e.target.value })
            }
            className={classes.textarea}
          ></textarea>


<label>Pictures</label>

    <div className={classes.miniPicGrid}>
        {imageList.map((url)=>{
        return <img src={url} className={classes.miniPic} alt="" key={url}/>
        })}
        <label className={classes.addPic}>
            <input 
                type="file" 
                id="file" 
                onChange={fileInputHandler} 
                accept="image/*"
                className={classes.addPic}></input>
            Add Picture
        </label>
    </div>


          <button type="submit" className={classes.button}>
            Add Project
          </button>
        </form>
        
      </motion.section>
    </AnimatePresence>
  );
};

export default AddProject;
