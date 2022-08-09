import classes from "./Input.module.css";

const ErrorMessage = (props) => {
  return (
    <>
      {!props.valid[0] ? <h4 className={`${classes.invalid} ${classes.errorMessage} ${props.type === "file" ? classes.invalidPicLabel : null}`}>{props.children}</h4> : null}
    </>
  )
}

const InputText = (props) => {
  return (
    <>
      <label htmlFor={props.id} className={`${classes.label} ${!props.valid[0] ? classes.invalid : null }`}>{props.children}</label>
      <input
        type="text"
        id={props.id}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className={`${classes.input} ${classes.textInput} ${!props.valid[0] ? classes.invalid : null}`}
      ></input>
      <ErrorMessage {...props}>{props.valid[1]}</ErrorMessage>
    </>
  );
};

const InputArea = (props) => {
  return (
    <>
      <label htmlFor={props.id} className={`${classes.label} ${!props.valid[0] ? classes.invalid : null }`}>{props.children}</label>
      <textarea
        id={props.id}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className={` ${classes.input} ${classes.textarea} ${!props.valid[0] ? classes.invalid : null}`}
      ></textarea>
      <ErrorMessage {...props}>{props.valid[1]}</ErrorMessage>
    </>
  );
};

const InputSelect = (props) => {
  return (
    <>
      <label htmlFor="type" className={`${classes.label}`}>Type</label>
      <select
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className={`${classes.input} ${classes.select}`}
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
      <label className={` 
                          ${classes.label} 
                          ${classes.addPic} 
                          ${!props.valid[0] ? classes.invalidPic : null}
                          ${props.loading ? classes.disabled : null}`
                          }>
        <input
          type="file"
          id={props.id}
          onChange={(e) => props.onChange(e.target.files[0])}
          accept="image/*"
          className={`${classes.fileInput}`}
          disabled={props.loading ? true : false}
        ></input>
        {props.loading ? 
        (<div className={classes.spinnerContainer}>
          <span
          className={`spinner-border ${classes.spinner}`}
          role="status"
          aria-hidden="true"
          ></span>
          </div>) : props.children}
        
      </label>
      <ErrorMessage {...props}>{props.valid[1]}</ErrorMessage>
    </>
  );
};

const InputEmail = (props) => {
  return (
    <>
      <label htmlFor={props.id} className={`${classes.label} ${!props.valid[0] ? classes.invalid : null }`}>{props.children}</label>
      <input
        type="email"
        id={props.id}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className={`${classes.input} ${classes.textInput} ${!props.valid[0] ? classes.invalid : null}`}
      ></input>
      <ErrorMessage {...props}>{props.valid[1]}</ErrorMessage>
    </>
  );
};

const InputPassword = (props) => {
  return (
    <>
      <label htmlFor={props.id} className={`${classes.label} ${!props.valid[0] ? classes.invalid : null }`}>{props.children}</label>
      <input
        type="password"
        id={props.id}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className={`${classes.input} ${classes.textInput} ${!props.valid[0] ? classes.invalid : null}`}
      ></input>
      <ErrorMessage {...props}>{props.valid[1]}</ErrorMessage>
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
    case "email":
      return <InputEmail {...props} />
    case "password":
      return <InputPassword {...props} />
  }
};

export default Input;
