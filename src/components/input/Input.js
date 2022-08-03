import classes from "./Input.module.css";

const ErrorMessage = (props) => {
  return (
    <>
      {!props.valid ? <h4 className={`${classes.invalid} ${classes.errorMessage}`}>{props.children}</h4> : null}
    </>
  )
}

const InputText = (props) => {
  return (
    <>
      <label htmlFor={props.id} className={`${!props.valid ? classes.invalid : null }`}>{props.children}</label>
      <input
        type="text"
        id={props.id}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className={`${classes.textInput} ${!props.valid ? classes.invalid : null}`}
      ></input>
      <ErrorMessage {...props}>{props.errorMessage}</ErrorMessage>
    </>
  );
};

const InputArea = (props) => {
  return (
    <>
      <label htmlFor={props.id} className={`${!props.valid ? classes.invalid : null }`}>{props.children}</label>
      <textarea
        id={props.id}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className={`${classes.textarea} ${!props.valid ? classes.invalid : null}`}
      ></textarea>
      <ErrorMessage {...props}>{props.errorMessage}</ErrorMessage>
    </>
  );
};

const InputSelect = (props) => {
  return (
    <>
      <label htmlFor="type">Type</label>
      <select
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className={classes.select}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

const InputFile = (props) => {
  return (
    <>
      <label className={classes.addPic}>
        <input
          type="file"
          id={props.id}
          onChange={(e) => props.onChange(e.target.files[0])}
          accept="image/*"
        ></input>
        {props.children}
      </label>
    </>
  );
};

const Input = (props) => {
  switch (props.type) {
    case "text":
      return <InputText {...props} />;
    case "textarea":
      return <InputArea {...props} />;
    case "select":
      return <InputSelect {...props} />;
    case "file":
      return <InputFile {...props} />;
  }
};

export default Input;
