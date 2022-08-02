import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import classes from "./AddProject.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/authContext";
import { storage } from '../../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage"
import { v4 } from "uuid"


const AddProject = () => {
  // const [type, setType] = useState("")
  // const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [project, setProject] = useState({
    id: `${v4()}`,
    type: 1,
    name: "",
    description: "",
    pictures: [],
  });

  const options = [
    { value: 1, label: "Project" },
    { value: 2, label: "Award" },
    { value: 3, label: "Article" },
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    
        console.log(project)
        console.log(acceptedFiles)
  };



  useEffect(() => {
    if (auth.isAuthenticated === false) {
      navigate("/");
    }
  }, []);


  
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    
    const files = acceptedFiles.map(file => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));


const [imageUpload, setImageUpload] = useState(null)
const [imageList, setImageList] = useState([])

const fileInputHandler = async (e) => {
    if(e.target.files[0].size > 2097152) {
        alert("file to big (maximum allowed size = 2mb")
    } else {
        setImageUpload(e.target.files[0])
    }

}
useEffect(()=>{
    uploadImage()
},[imageUpload])

const imageListRef = ref(storage, "images/")
// const listobrazki = ()=> {
//     listAll(imageListRef).then((response)=>{
//         response.items.forEach((item)=>{
//             getDownloadURL(item).then((url)=>{
//                 setImageList((prev) => [...prev, url])
                
//             })
//         })
//     })
// }



useEffect(()=>{
    if(imageList) {
       setProject({...project, pictures: imageList})
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
            value={project.name}
            onChange={(e) => setProject({ ...project, name: e.target.value })}
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
        return <img src={url} className={classes.miniPic}/>
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
        <button onClick={uploadImage}>Upload</button>
        <button onClick={(e)=>{console.log(acceptedFiles)}}>acceptedFiles</button>
        
      </motion.section>
    </AnimatePresence>
  );
};

export default AddProject;
