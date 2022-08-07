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
        <button className={classes.button}>Delete</button>
    </div>
    )
}

export default ProjectBar;