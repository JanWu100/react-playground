import classes from "./ProjectBar.module.css"

const ProjectBar = (props) => {
    return (
        <div className={classes.projectBar}>
        <img src={props.thumbnail} 
                className={classes.thumbnail} alt=""></img>
            <div className={classes.projectBarBlock}>
                <p className={classes.projectBarText}>{props.title}</p>
            </div>
            <div className={classes.projectBarBlock}>
                 <p className={classes.projectBarText}>{props.type}</p>
            </div>
        <button 
            disabled={props.loading ? true : false}
            className={`${classes.button} ${props.loading ? classes.disabled : null}`} 
            onClick={()=>{props.onDelete(props.id)}
            
            }>
            {props.loading ? (
                        <>
                        <span
                            className={`spinner-border ${classes.spinner}`}
                            role="status"
                            aria-hidden="true"
                        ></span>
                       
                        </>
                        ) : "Delete" }</button>
    </div>
    )
}

export default ProjectBar;