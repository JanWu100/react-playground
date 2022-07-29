import { useParams } from "react-router-dom";
import classes from "./Photos.module.css";
import arrow from "../../assets/arrow.svg";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Photos = (props) => {
  const params = useParams();
  const currentItem = props.projects.filter(
    (x) => x.id === parseInt(params.id)
  )[0];
  const photos = currentItem.big;

  return (
    <>
      <motion.section
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ duration: .2 }}
      >
        <div className={classes.navbar}>
          <Link
            to={`/${params.type}/${params.id}`}
            state={{ from: "photos" }}
            className={classes.arrowLink}
          >
            <img className={classes.arrow} src={arrow} alt=""></img>
          </Link>
        </div>
        <div className={classes.photos}>
          {photos.map((photo) => (
            <img
              className={classes.photo}
              key={Math.random()}
              src={`../${photo}`}
            ></img>
          ))}
        </div>
      </motion.section>
    </>
  );
};

export default Photos;
