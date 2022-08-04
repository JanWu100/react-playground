import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button type={props.type} className={classes.button}>
      {props.loading ? (
        <>
          <span
            className={`spinner-border me-3 ${classes.spinner}`}
            role="status"
            aria-hidden="true"
          ></span>
          <span >Loading...</span>
        </>
      ) : props.label} 
      
    </button>
  );
};

export default Button;
