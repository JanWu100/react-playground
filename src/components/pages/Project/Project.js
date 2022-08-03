import classes from "./Project.module.css";
import { useParams, useLocation } from "react-router-dom";
import ContactBar from "../../Footer/ContactBar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Project = (props) => {
  const location = useLocation()
  let from = null;
  if ( location.state) {
   from = location.state.from

  }
  const params = useParams();
  const currentItem = props.projects.filter(
    (x) => x.id === params.id
  )[0];


  return (
    <>
      <p className={classes.title}>{currentItem.title}</p>

      <motion.div
        initial={from === "photos"? { x: -300, opacity: 0 } : { x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: .2 }}
        className={classes.projectContainer}
      >
        <p className={classes.description}>{currentItem.description}</p>
        <div className={classes.picturesGrid}>
          {currentItem.big.map((image) => (
            <Link to={`/${params.type}/${params.id}/photos`} key={image}>
              <img className={classes.picture} src={image} alt=""></img>
            </Link>
          ))}
        </div>
        <ContactBar />
      </motion.div>
    </>
  );
};

export default Project;
