import classes from "./Contact.module.css";
import { useEffect, useRef } from "react";
import useWindowDimensions from "../hooks/getWindowsDimensions";

const Contact = (props) => {
  const contactRef = useRef();
  const { width } = useWindowDimensions();

  useEffect(() => {
    setTimeout(() => {
      contactRef.current.className = `${classes.main} ${classes.mainActive}`;
    }, 0);
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
        {width > 768 ? (
                        <a href="#" className={classes.menuLink}>
                        <p className={classes.menuItem}>Contact</p>
                        </a>
                        ) : (
                            <a href="#" onClick={onClickHandler} className={classes.menuLink}>
                            <p className={classes.menuItem}>Contact</p>
                            </a>
                            )}
        

        <div className={classes.body}>
          <p>Loremska 40a/15</p>
          <p>61-999 Poznan, Poland</p>
          <p className={classes.underline}>mail@example.com</p>
          <p className={classes.underline}>+48 100200300</p>
          <p className={classes.underline}>facebook instagram</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
