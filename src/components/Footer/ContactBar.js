import classes from "./ContactBar.module.css";

const ContactBar = () => {
  return (
      <div className={classes.main}>
        <p className={classes.lead}>
          Interested in developing your project with us?
        </p>
        <button className={classes.button}>Contact us</button>
      </div>
  );
};

export default ContactBar;