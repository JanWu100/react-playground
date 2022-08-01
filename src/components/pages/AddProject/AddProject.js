import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import classes from "./AddProject.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/authContext";

const AddProject = () => {
  // const [type, setType] = useState("")
  // const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [project, setProject] = useState({
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

    console.log(project);
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



<section className="container">
      <div {...getRootProps({className: 'dropzone'})}  className={classes.dropzone}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>

          <button type="submit" className={classes.button}>
            Add Project
          </button>
        </form>
      </motion.section>
    </AnimatePresence>
  );
};

export default AddProject;
