import logo from "../../assets/SIMPLE_LOGO.svg";
import arrow from "../../assets/arrow.svg";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";
import { useParams } from "react-router-dom";
import useWindowDimensions from "../hooks/getWindowsDimensions";
import { useEffect } from "react";

const Navbar = (props) => {
  const { width } = useWindowDimensions();
  const params = useParams()


  return (
    <nav className={classes.navbar}>
      {window.location.pathname !== "/" ? (
          <Link to="/" state={{ from: "navbar" }}>
          <img
            className={classes.arrow}
            src={arrow}
            alt=""
          ></img></Link>
      ) :  <Link to="/"><img className={classes.logo} src={logo}></img></Link>}
     
    

      <ul className={classes.list}>
        <li className={classes.listItem}>
          <Link to="/login" className={classes.link}>Login</Link>
        </li>
        <li className={classes.listItem}>
        {window.location.pathname === "/about" ? <Link to="/" state={{ from: "navbar" }} className={classes.link}>Works</Link> : <Link to="/about" className={classes.link}>About</Link>}
          
          
        </li>
        <li className={classes.listItem}>
          {width >= 768 ?  
          ( <a href="#" onMouseEnter={props.onContact} className={classes.link}>
          Contact
        </a>)
          :
          (<a href="#" onClick={(e)=>{e.preventDefault()
          props.onContact()}} className={classes.link}>
          Contact
        </a>)
          }
         
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
