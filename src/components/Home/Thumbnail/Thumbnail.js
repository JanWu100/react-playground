import classes from "./Thumbnail.module.css";
import { Link } from "react-router-dom";

const Thumbnail = ({ type, id, thumbnail, title }) => {

  if (id) {
    return (
      <Link to={`/${type}/${id}`} className={classes.link}>
        <div className={classes.card}>
          <img className={classes.photo} src={thumbnail} alt=""></img>
          <div className={classes.cardBody}>
            <h3 className={classes.cardName}>{type}</h3>
            <h2 className={classes.cardDescription}>{title}</h2>
          </div>
        </div>
      </Link>
    );
  } else {
    return (
      <Link to={"/login"} className={classes.link}>
        <div className={classes.card}>
          <div className={classes.addProject}>
          <h2 className={classes.addProjectText}>Add Project</h2>
          </div>

        </div>
      </Link>
    );
  }
  
};

export default Thumbnail;
