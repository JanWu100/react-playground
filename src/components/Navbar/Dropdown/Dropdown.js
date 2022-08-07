import classes from "./Dropdown.module.css";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

const Dropdown = (props) => {
  const [auth, setAuth] = useAuth()
    const navigate = useNavigate()
    const logoutHandler = () => {
        props.closeDropdown()
        setAuth(false)
        navigate("/")
      }

  return (
    <>
      <div className={classes.dropdown}>
        <ul className={classes.list}>
          <li className={`${classes.listItem} ${classes.control}`}>
          <Link to="/editprojects" className={classes.contactButton}>Edit Projects</Link> 
          </li>
          <li className={`${classes.listItem} ${classes.control}`}>
          <Link to="/addproject" className={classes.contactButton}>Add Project</Link> 
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
