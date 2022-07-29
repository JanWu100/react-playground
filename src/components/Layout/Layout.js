import classes from "./Layout.module.css"


const Layout = (props) => {
  return (
    <>
    <aside>{props.contact}</aside>
      <div className={classes.layout}>
        <div>{props.navbar}</div>
        <div>{props.content}</div>
        <div className={classes.push}></div>
      </div>
      <div className={classes.footer}>{props.footer}</div>
    </>
  );
};

export default Layout;
