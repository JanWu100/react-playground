import classes from "./Contact.module.css";
import { useEffect, useRef } from "react";
import useWindowDimensions from "../hooks/getWindowsDimensions";

const Contact = (props) => {
  const contactRef = useRef();
  const { width } = useWindowDimensions();

  useEffect(() => {
      contactRef.current.className = `${classes.main} ${classes.mainActive}`;
  }, []);

  const onClickHandler = (e) => {
    e.preventDefault()
    contactRef.current.className = `${classes.main}`;
    setTimeout(() => {
      props.onHideContact();
    }, 300);
  };

  const onMouseEnterHandler = ()=> {
    props.onHideContact();
  }

  return (
    <div className={classes.container}>
        {width > 768 ? 
        <div className={classes.backdrop} onMouseEnter={onMouseEnterHandler}></div> 
        :  <div className={classes.backdrop} onClick={onClickHandler}></div> 
        }
     
      <div className={classes.main} ref={contactRef}>
        <div className={classes.contactContainer}>
          {width > 768 ? (
                          <button className={classes.contactButton}>
                          <p className={classes.menuItem}>Contact</p>
                          </button>
                        
                          ) : (
                            <button onClick={onClickHandler} className={classes.contactButton}>
                            <p className={classes.menuItem}>Contact</p>
                            </button>
                          )}
        </div>
        

        <div className={classes.body}>
          <p className={classes.label}>email</p>
          <p className={classes.link}><a href = "mailto: wagrowskij@gmail.com">wagrowskij@gmail.com</a></p>
          <p className={classes.label}>This project on github:</p>
          <p className={classes.link}><a href="https://github.com/JanWu100/react-playground" target="blank">github</a></p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
