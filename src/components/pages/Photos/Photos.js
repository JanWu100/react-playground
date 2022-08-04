import { useParams } from "react-router-dom";
import { useContext } from "react";
import classes from "./Photos.module.css";
import arrow from "../../../assets/arrow.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { stringToUrlFriendly } from "../../../helpers/formatUrl";
import DataContext from "../../context/dataContext";

const Photos = () => {
  const params = useParams();
  const dataContext = useContext(DataContext)
  const currentItem = dataContext.projects.filter(
    (x) => stringToUrlFriendly(x.title) === params.title
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
            to={`/${params.title}`}
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
              src={photo}
              alt=""
            ></img>
          ))}
        </div>
      </motion.section>
    </>
  );
};

export default Photos;
