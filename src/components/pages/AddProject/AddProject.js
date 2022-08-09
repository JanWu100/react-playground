import React from "react";
import classes from "./AddProject.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect} from "react";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";
import Input from "../../input/Input";
import { stringToUrlFriendly } from "../../../helpers/formatUrl";
import Button from "../../Button/Button";
import DataContext from "../../context/dataContext";
import useAuth from "../../hooks/useAuth";
import AuthContext from "../../context/authContext";

const AddProject = () => {
  const navigate = useNavigate();
  const dataContext = useContext(DataContext)
  const authContext = useContext(AuthContext)

  const [auth] = useAuth()
  const [loading, setLoading] = useState(false)
  const [project, setProject] = useState({
    type: "Project",
    title: "",
    description:
      "Sed senectus quam tempor pharetra tincidunt. Urna, venenatis netus lacus, odio. Turpis lorem quis ut in. Tincidunt aliquam vitae, fermentum quis nibh dignissim. Commodo amet phasellus urna cursus fermentum. Id purus quam viverra tempus nec bibendum amet. Natoque neque eget platea in tempus. Nunc rhoncus aliquet pellentesque quis vitae ornare justo hac. Gravida integer eget purus risus eget. Quisque pellentesque proin vestibulum commodo.",
    big: [],
    thumbnail: null,
    link: "",
    createdBy: authContext.user.userId
  });

  const options = [
    { value: "Project", label: "Project" },
    { value: "Award", label: "Award" },
    { value: "Article", label: "Article" },
  ];

  const [valid, setValid] = useState({
    title: [true, ""],
    description: [true, ""],
    link: [true, ""],
    pictures: [true, ""]
  })

  const submitHandler = async (e) => {
    e.preventDefault();
    if ( project.type === "Project") {
      addProjectToDatabase()
    } else {
      addAwardOrArticleToDatabase()
    }
  };

  const DB_PATH = process.env.REACT_APP_DB_PATH;

  const addAwardOrArticleToDatabase = async () => {
    if (project.title.length + project.link.length === 0) {
      setValid({...valid, title: [false, "Testowy msg"], link: [false, "Testowy msg"]})
    } else if (project.title.length === 0) {
      setValid({...valid, title: [false, "Testowy msg"]})
    } else if (project.link.length === 0) {
      setValid({...valid, link: [false, "Testowy msg"]})
    } else if (project.big.length === 0) {
      setValid({...valid, pictures: [false, "There needs to be atleast 1 picture"]})
      console.log("Project needs some pictures");
    } else {
      setLoading(true)
      await axios.post(`${DB_PATH}/projects/${authContext.user.userId}.json?auth=${authContext.user.token}`,
                         {type: project.type, 
                          title: project.title, 
                          link: project.link, 
                          thumbnail: project.thumbnail});
      dataContext.fetchProjects() 
      navigate("/");

    }
    
  }

  const addProjectToDatabase = async () => {
    
      if (project.title.length + project.description.length === 0) {
        setValid({...valid, title: [false, "Testowy msg"], description: [false, "Testowy msg"]})
      } else if (project.title.length === 0) {
        setValid({...valid, title: [false, "Testowy msg"]})
      } else if (project.description.length === 0) {
        setValid({...valid, description: [false, "Testowy msg"]})
      } else if (project.big.length === 0) {
        setValid({...valid, pictures: [false, "There needs to be atleast 1 picture"]})
      } else {
        setLoading(true)
        
        const res = await axios.get(`${DB_PATH}/projects.json`);
        const currentTitles =[]
        
 
        if(res.data) {
          Object.entries(res.data).forEach(([key, value]) => {
            Object.entries(value).forEach(([key, value]) => {
              currentTitles.push(stringToUrlFriendly(value.title))
            })
          });     
        }

  
        if(currentTitles.includes(stringToUrlFriendly(project.title))) {
          setValid({...valid, title: [false, "Title used"]})
          setLoading(false)
          return;
        } 
  
        await axios.post(`${DB_PATH}/projects/${authContext.user.userId}.json?auth=${authContext.user.token}`, project);
        dataContext.fetchProjects()
        navigate("/");
        
      }
  
  }

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const fileInputHandler = async (file) => {
    if (file.size > 2097152 / 2) {
      setValid({...valid, pictures: [false, "File too big. Maximum file size is 1mb"]})
    } else if (imageList.length >= 1 && project.type !== "Project") {
      setValid({...valid, pictures: [false, "Can't upload multiple Thumbnails"]})
    } else {
      setLoading(true)
      setImageUpload(file);
    }
  };

  useEffect(() => {
    uploadImage();
  }, [imageUpload]);

  useEffect(() => {
    if (imageList) {
      setProject({ ...project, big: imageList, thumbnail: imageList[0] });
    }
  }, [imageList]);

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, [url, imageRef.name]]);
        setValid({...valid, pictures: [true, ""]})
        setLoading(false)
      });
    });
  };

  const inputChangeHandler = (value, description) => {
    setProject({ ...project, [description]: value });
    setValid({...valid, [description]: [true, ""]})
  };

  const onPicClick = async (e) => {
    const fileNameInStorage = e.target.id 
    const imageRef = ref(storage, `images/${fileNameInStorage}`);
    deleteObject(imageRef)
    const newImageList = imageList.filter((x)=>{ return x[1] !== fileNameInStorage} )
    setImageList(newImageList)

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
        transition={{ duration: 0.2 }}
        className={classes.loginContainer}
      >
        <h4 className={classes.headerText}>Add Project</h4>
        <form onSubmit={submitHandler}>
          <Input
            value={project.type}
            type="select"
            id="Type"
            options={options}
            onChange={(val) => inputChangeHandler(val, "type")}
          >
            Type
          </Input>

          <Input
                value={project.title}
                type="text"
                id="Title"
                onChange={(val) => inputChangeHandler(val, "title")}
                valid={valid.title}
                >
                Title
              </Input>

          {project.type === "Project" ? (
            <>
              <Input
                value={project.description}
                type="textarea"
                id="Description"
                onChange={(val) => inputChangeHandler(val, "description")}
                valid={valid.description}
                >
                Description
              </Input>
              <label className={classes.label}>Pictures</label>
              <div className={classes.miniPicGrid}>
                {imageList.map((url) => {
                  return (
                    <img src={url[0]} id={url[1]} className={classes.miniPic} alt="" key={url[1]} onClick={onPicClick}/>
                  );
                })}
                <Input
                  type="file"
                  id="File"
                  onChange={(file) => fileInputHandler(file)}
                  valid={valid.pictures}
                  loading={loading}
                >
                  Add picture
                </Input>
              </div>
            </>
            

          ) : (
            <>
              <Input
                value={project.link}
                type="text"
                id="Link"
                onChange={(val) => inputChangeHandler(val, "link")}
                valid={valid.link}
                >
                Link to {project.type === "Article" ? "Article" : "Award"}
              </Input>
              <label className={classes.label}>Thumbnail</label>
              <div className={classes.miniPicGrid}>
              {imageList[0] ? 
                <img src={imageList[0][0]} id={imageList[0][1]} className={classes.miniPic} alt="" key={imageList[0][0]} onClick={onPicClick}/> 
                :
                (
                  <Input
                  type="file"
                  id="File"
                  onChange={(file) => fileInputHandler(file)}
                  valid={valid.pictures}
                  loading={loading}
                  >
                  Add thumbnail
                  </Input>
                ) }    
              

              </div>
            </>
          )      
          }
          <Button type="submit" label={`Add ${project.type}`} loading={loading}/>
        </form>
      </motion.section>
    </AnimatePresence>
  );
};

export default AddProject;
