import logo from "../../assets/SIMPLE_LOGO.svg";
import arrow from "../../assets/arrow.svg";
import { Link, useParams, useNavigate} from "react-router-dom";
import classes from "./Navbar.module.css";
import useWindowDimensions from "../hooks/getWindowsDimensions";
import { useState} from "react";
import Dropdown from "./Dropdown/Dropdown";
import useAuth from "../hooks/useAuth";

const Navbar = (props) => {
  const { width } = useWindowDimensions();
  const params = useParams()
  const navigate = useNavigate()
  const [auth, setAuth] = useAuth()

  const [controlVisible, setControlVisible] = useState(false)

  const controlHandler = (e) => {
    if (controlVisible === false) {
      setControlVisible(true)
    } else {
      setControlVisible(false)
    }
  }

  return (
    <nav className={classes.navbar}>
      {window.location.pathname !== "/" ? (
          <Link to="/" state={{ from: "navbar" }}>
          <img
            className={classes.arrow}
            src={arrow}
            alt=""
          ></img></Link>
      ) :  <Link to="/"><img className={classes.logo} src={logo} alt=""></img></Link>}
     
    

      <ul className={classes.list}>
        <li className={`${classes.listItem} ${classes.control}`}>
          {!auth ? 
            <Link to="/login" className={classes.link}>Login</Link> 
            : 
            <button className={classes.contactButton} onClick={controlHandler}>Control</button>}
            {controlVisible ? (
              <Dropdown closeDropdown={controlHandler}/>
            )
             : null}
        </li>
        <li className={classes.listItem}>
        {window.location.pathname === "/about" ? <Link to="/" state={{ from: "navbar" }} className={classes.link}>Works</Link> : <Link to="/about" className={classes.link}>About</Link>}
          
          
        </li>
        <li className={classes.listItem}>
          {width >= 768 ?  
          ( <button onMouseEnter={props.onContact} className={classes.contactButton}>
          Contact
        </button>)
          :
          (<button onClick={(e)=>{e.preventDefault()
          props.onContact()}} className={classes.contactButton}>
          Contact
        </button>)
          }
         
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
