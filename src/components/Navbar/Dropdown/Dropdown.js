import classes from "./Dropdown.module.css";
import { useContext} from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";

const Dropdown = (props) => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const logoutHandler = () => {
        props.closeDropdown()
        auth.logout()
        navigate("/")
      }

  return (
    <>
      <div className={classes.dropdown}>
        <ul className={classes.list}>
          <li className={`${classes.listItem} ${classes.control}`}>
            <button className={classes.contactButton}>Edit Projects</button>
          </li>
          <li className={`${classes.listItem} ${classes.control}`}>
            <button className={classes.contactButton} onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
      </div>
      <div className={classes.backdrop} onClick={props.closeDropdown}></div>
    </>
  );
};

export default Dropdown;
